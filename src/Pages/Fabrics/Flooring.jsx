export default function Flooring({ t, dir }) {

    return (
        <div dir={t.dir}>
            {t?.fabricsSubCategories.flooring}
        </div>
       
    );

}