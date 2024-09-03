import { links } from './Header';

export default function BottomNav() {
  return (
    <div className="btm-nav flex sm:hidden">
      {links.map((link) => (
        <button key={link.name}>
          <link.icon className="h-5 w-5" />
        </button>
      ))}
    </div>
  );
}
