import Link from "next/link";

export default function Home() {
  return (
   <div>
    <h1>Mi primera pagina</h1>
    <Link href="/login">ir al login</Link>
   </div>
  );
}
