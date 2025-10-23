export default function AddData({t}) {

    function handleSubmit() {

    }

return(

    // Fabrics:
    // Decoration fabrics
    // Projects screen
    // Holograme
    // Flooring

    // Tracks:
    // Chain Track 
    // Reveal systems
    // Tracks
    // Rollups

    // Frames
  
    <div className="container p-3 mt-5 mb-5 border rounded">
          <h2 class="text-center ">Add products</h2>
        <div className="row">

        <form onSubmit={handleSubmit}>
        <p>
                <label>Category:&nbsp;</label>
                <select required>
                    <optgroup label="Fabrics">
                        <option>Decoration fabrics</option>
                        <option>Projects screen</option>
                        <option>Holograme</option>
                        <option>Flooring</option>
                    </optgroup>
                     <optgroup label="Tracks">
                        <option>Chain Track</option>
                        <option>Reveal systems</option>
                        <option>Tracks</option>
                        <option>Rollups</option>
                    </optgroup>
                    <option> Frames</option>
                </select>
            </p>
            
            <p>
                <label required>English name:&nbsp;</label>
                <input type="text"/>
            </p>

            <p>
                <label>Arabic name:&nbsp;</label>
                <input type="text"/>
            </p>

             <p>
                <label>English desc:&nbsp;</label>
                  <textarea rows="5" cols="90"></textarea>
            </p>

            <p>
                <label>Arabic desc:&nbsp;</label>
                <textarea rows="5" cols="90"></textarea>
            </p>
            <p>
                <label>Image path:&nbsp;</label>
                <input type="text"/>
            </p>

               <p>
                <label>created at&nbsp;</label>
                <input type="date"/>
            </p>

            <button className="rounded">Submit</button>
        </form>
        </div>
    </div>

);
   
}