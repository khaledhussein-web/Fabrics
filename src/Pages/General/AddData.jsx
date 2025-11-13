import React, { useState, useEffect } from 'react';
// FIX: Reverting imports to standard package names (without full CDN paths)
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, onSnapshot, serverTimestamp, setLogLevel } from 'firebase/firestore';

// --- Global Variables (MUST be used for Firestore) ---
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : undefined;


// Initialize Firebase references as global variables (will be set in useEffect)
let app = null;
let db = null;
let auth = null;


export default function AddData() {
  const [isReady, setIsReady] = useState(false); // Tracks if Firebase services are initialized and auth is complete
  const [userId, setUserId] = useState(null);
  const [categories, setCategories] = useState([]);

  // Form State
  const [categoryId, setCategoryId] = useState('');
  const [englishName, setEnglishName] = useState('');
  const [arabicName, setArabicName] = useState('');
  const [englishDesc, setEnglishDesc] = useState('');
  const [arabicDesc, setArabicDesc] = useState('');
  const [imagePath, setImagePath] = useState('');
  
  // UI State
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);


  // 1. Authentication and Initialization Effect
  useEffect(() => {
    
    // This function handles the entire Firebase setup and authentication sequence
    const initFirebaseAndAuth = async () => {
        try {
            if (Object.keys(firebaseConfig).length === 0) {
                console.error("❌ Firebase configuration is empty. Cannot initialize app.");
                // Still mark as ready to exit loading state, but display error message
                setMessage("❌ Configuration missing. Cannot connect to database.");
                setIsReady(true);
                return;
            }
            
            // --- FIREBASE INITIALIZATION MOVED INSIDE EFFECT ---
            // These calls rely on the standard imports which should now resolve correctly
            app = initializeApp(firebaseConfig);
            db = getFirestore(app);
            auth = getAuth(app);
            setLogLevel('debug'); // Enable Firestore logging
            console.log("✅ Firebase services initialized.");
            
            // --- AUTHENTICATION ---
            if (initialAuthToken) {
                await signInWithCustomToken(auth, initialAuthToken);
                console.log("✅ Signed in with custom token.");
            } else {
                await signInAnonymously(auth);
                console.log("✅ Signed in anonymously.");
            }
        
            // Use onAuthStateChanged to reliably get the final user ID and mark ready
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUserId(user.uid);
                }
                // CRITICAL: Always set isReady to true after the auth check is done
                setIsReady(true); 
            });

            return () => unsubscribe();

        } catch (error) {
            console.error("❌ Fatal Error during Firebase setup and auth:", error);
            // On failure, set a temp ID and mark as ready to exit loading state
            setUserId(crypto.randomUUID()); 
            setIsReady(true); 
            setMessage(`❌ Fatal Error: Could not initialize app. Check console for details. ${error.message}`);
        }
    };

    initFirebaseAndAuth();
  }, []); // Run only once


  // 2. Fetch Categories Effect (runs once authentication is ready)
  useEffect(() => {
    // Guard: Need to be ready, and need the database instance (db should be set by initFirebaseAndAuth)
    if (!isReady || !db) return; 

    // Using Public Data Path for relaxed permissions
    const CATEGORIES_COLLECTION_PATH = `artifacts/${appId}/public/data/categories`;

    const q = query(collection(db, CATEGORIES_COLLECTION_PATH));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedCategories = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort by English name in the client
      fetchedCategories.sort((a, b) => (a.name_en || '').localeCompare(b.name_en || ''));

      setCategories(fetchedCategories);
      console.log(`✅ Fetched ${fetchedCategories.length} categories from Firestore.`);
    }, (error) => {
      // This is the error we were originally debugging (permissions/network)
      console.error('❌ Error listening to categories (Permissions or Network):', error);
      setMessage(`Error fetching categories. Check if documents exist in: ${CATEGORIES_COLLECTION_PATH}`); 
    });

    return () => unsubscribe();
  }, [isReady]); // Depend on isReady


  // 3. Handle Product Submission
  async function handleSubmit(e) {
    e.preventDefault();
    // Check for both readiness and database instance before proceeding
    if (!isReady || !userId || loading || !db) {
      setMessage('App is not fully initialized or user is not authenticated.');
      return;
    }

    setLoading(true);
    setMessage('');
    
    // Public Data Path for product submission
    const PRODUCTS_COLLECTION_PATH = `artifacts/${appId}/public/data/products`;


    const selectedCategory = categories.find(cat => cat.id === categoryId);

    if (!selectedCategory) {
      setMessage('❌ Please select a valid category.');
      setLoading(false);
      return;
    }

    const newProduct = {
      created_at: serverTimestamp(), 
      category_id: categoryId,
      category_name_en: selectedCategory.name_en,
      name_en: englishName,
      name_ar: arabicName,
      description_en: englishDesc,
      description_ar: arabicDesc,
      image_path: imagePath,
      user_id: userId, // Record which user added the data
    };

    try {
      await addDoc(collection(db, PRODUCTS_COLLECTION_PATH), newProduct);

      setMessage('✅ Product added successfully!');
      
      // Clear form fields
      setCategoryId('');
      setEnglishName('');
      setArabicName('');
      setEnglishDesc('');
      setArabicDesc('');
      setImagePath('');
      
    } catch (error) {
      console.error('❌ Error adding product to Firestore:', error);
      setMessage(`❌ Failed to add product: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }


  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-medium text-blue-600 animate-pulse">Loading application...</p>
      </div>
    );
  }

  // Display the authenticated user ID for debugging/reference
  const DISPLAY_USER_ID = userId || 'N/A';
  const DISPLAY_PRODUCTS_PATH = `artifacts/${appId}/public/data/products`;

  return (
    <div className="container p-6 mt-5 mb-5 border rounded-lg shadow-2xl mx-auto max-w-4xl bg-gray-50">
      <h2 className="text-3xl font-extrabold text-center mb-4 text-gray-900">Add New Product Data</h2>
      
      <div className="text-center mb-6 p-3 bg-blue-100 rounded-md">
        <p className="text-sm text-gray-700">
          Authenticated User ID: <code className="font-mono text-xs bg-white p-1 rounded-sm">{DISPLAY_USER_ID}</code>
        </p>
        <p className="text-sm text-gray-700">
          Data Collection Path: <code className="font-mono text-xs bg-white p-1 rounded-sm">{DISPLAY_PRODUCTS_PATH}</code>
        </p>
      </div>

      {message && (
        <div 
          className={`p-3 mb-4 rounded-lg shadow-md ${message.startsWith('✅') ? 'bg-green-100 text-green-700 border-l-4 border-green-500' : 'bg-red-100 text-red-700 border-l-4 border-red-500'}`}
          role="alert"
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* CATEGORY DROPDOWN */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Category:</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          >
            <option value="">Select Category ({categories.length} loaded)</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name_en} ({cat.name_ar})
              </option>
            ))}
          </select>
          {categories.length === 0 && (
            <p className="mt-2 text-sm text-yellow-600">
              No categories found. Please ensure you have documents in the public categories collection.
            </p>
          )}
        </div>

        {/* ENGLISH NAME */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">English Name:</label>
          <input
            type="text"
            value={englishName}
            onChange={(e) => setEnglishName(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          />
        </div>

        {/* ARABIC NAME */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Arabic Name:</label>
          <input
            type="text"
            value={arabicName}
            onChange={(e) => setArabicName(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          />
        </div>

        {/* ENGLISH DESC */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">English Description:</label>
          <textarea
            rows="3"
            value={englishDesc}
            onChange={(e) => setEnglishDesc(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          ></textarea>
        </div>

        {/* ARABIC DESC */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Arabic Description:</label>
          <textarea
            rows="3"
            value={arabicDesc}
            onChange={(e) => setArabicDesc(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          ></textarea>
        </div>

        {/* IMAGE PATH */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Image Path (URL/Internal Path):</label>
          <input
            type="text"
            value={imagePath}
            onChange={(e) => setImagePath(e.target.value)}
            placeholder="/uploads/fabrics/example.jpg"
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          />
          <small className="text-gray-500 mt-1">
            Path is for display purposes (e.g., "/uploads/fabrics/velvet.jpg").
          </small>
        </div>

        <button 
          type="submit" 
          className="w-full py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150"
          disabled={loading || !categoryId || !englishName}
        >
          {loading ? (
             <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
            </span>
          ) : 'Submit Product to Firestore'}
        </button>
      </form>
    </div>
  );
}