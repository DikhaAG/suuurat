//import Image from "next/image";

const NoResultFound = () => {
  return (
    <div className="flex flex-col text-slate-700 h-full place-content-center mx-auto gap-3 w-fit">
      <div className="w-fit mx-auto">
        {/* <Image src={'/image/no_results.png'} alt="No result" width={120} height={120} /> */}
      </div>
      <div className="text-2xl">Hasil tidak ditemukan..</div>
    </div>
  );
};

export default NoResultFound;
