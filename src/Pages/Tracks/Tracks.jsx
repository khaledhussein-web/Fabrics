export default function Tracks({ t, dir }) {

    return (
        <div dir={t.dir}>
            {t?.productsCategories.tracks}
        </div>
       
    );

}
