
export default function Footer() {
  return (
    <div className="bg-orange-500 py-10 ">
      <div className=" container mx-auto flex justify-between flex-col md:flex-row items-center ">
        <span className="text-3xl text-white font-bold tracking-tight ">
          MearnEats.com
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <samp>Privacy Policy</samp>
          <samp>Terms of Service</samp>
        </span>
      </div>
    </div>
  );
}
