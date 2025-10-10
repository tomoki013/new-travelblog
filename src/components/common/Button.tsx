import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

const Button = ({ children, href, className }: ButtonProps) => {
  return (
    <div className="text-center mt-16">
      <Link
        href={href}
        className={`inline-block py-3 px-10 bg-secondary text-white uppercase text-sm font-bold tracking-wider rounded-full border-2 border-secondary transition-all duration-300 ease-in-out hover:bg-transparent hover:text-secondary ${className}`}
      >
        {children}
      </Link>
    </div>
  );
};

export default Button;
