const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 py-8 bg-primary/5 border-t border-slate-200 text-center text-slate-600 text-sm">
      <p className="max-w-md mx-auto mb-2">
        Perspecto is a modern blog sharing insights, stories, and perspectives on technology, creativity, and culture.
      </p>
      <p>
        © {new Date().getFullYear()} <span className="font-semibold text-slate-800">Perspecto</span>.  
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
