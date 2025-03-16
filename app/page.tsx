import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"/editor/123"}>go to editor</Link>
      <h1>hello world</h1>
    </div>
  );
}
