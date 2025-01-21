"use client"
const AuthPage = ({isSignin}:{isSignin:boolean}) => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">{isSignin ? "Signin" : "Signup"}</h1>
        <div className="p-6 m-2 bg-white text-black font-semibold rounded-md">
            <div className="">
                <input className="outline-none w-full py-3 px-5 bg-slate-100 rounded-md" type="text" placeholder="Enter Your Email"/>
            </div>
            <div className="mt-3">
                <input className="outline-none w-full py-3 px-5 bg-slate-100 rounded-md" type="password" placeholder="Enter Your Password"/>
            </div>
            <div className="mt-5 flex" onClick={() =>{}}>
                <button className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm md:text-base font-semibold">{isSignin ? "Signin" : "Signup"}</button>
            </div>
        </div>
    </div>
  )
}

export default AuthPage