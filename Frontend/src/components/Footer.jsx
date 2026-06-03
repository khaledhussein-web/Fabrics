const Footer = ({ t, dir }) => {
  return (
    <footer className="footer" dir={dir}>
      <p>
        {/* We explicitly add the spaces and separator here */}
        {"\u00A9"} {t?.footer.date} {t?.footer.StageWare} - {t?.footer.rightsReserved}
      </p>
    </footer>
  );
}

export default Footer;
