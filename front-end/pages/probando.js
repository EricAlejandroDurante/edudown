import Head from "next/head";
import { useSession } from "next-auth/react";

import OneUser from "components/OneUser"

export default function Probando(){
    const {data:session} = useSession()

    return(
        <div>
            <OneUser userId={"62c72b56541790ded9eaf5af"} />
        </div>
    )
}