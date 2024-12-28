import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Service Clear",
  description: "This is A Dashboard Admin for Service Clear",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <div className=" ">
          <h1 className=" ">
            Welcome 
          </h1>
        </div>

      </DefaultLayout>
    </>
  );
}
