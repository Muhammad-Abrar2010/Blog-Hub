import { Link } from "react-router-dom";

const Register = () => {
    return (
   <>     <div className="w-full mx-auto lg:w-[800px] shadow-lg bg-white flex group text-[#8ea7e9]">
   <div className="w-1/2 min-h-full bg-[#8ea7e9] relative overflow-hidden hidden lg:block">
     <h1 className="text-white text-2xl absolute bottom-3 right-3 text-right">Hey! <br /> Join in<br /> Blog Hub</h1>
     
   </div>
   <form className="p-8 flex-1">
     <h1 className="text-4xl pb-4">Register</h1>
     <div className="space-y-5">
       <label htmlFor="email_" className="block">Email</label>
       <input id="email_" type="email" placeholder="example@example.com" className="p-3 block w-full shadow-lg outline-none border-2 rounded-md  invalid:border-red-700 valid:border-[#8ea7e9]"/>
       <label htmlFor="password_" className="block">Password</label>
       <input id="password_" type="password" placeholder=".............." min={5} className="p-3 block w-full shadow-lg outline-none border-2 rounded-md  invalid:border-red-700 valid:border-[#8ea7e9]"/>
     </div>
     {/* button type will be submit for handling form submission*/}
     <button type="button" className="py-2 px-5 mb-4 mt-8 overflow-hidden shadow-lg border-2 rounded-md  border-[#8ea7e9] before:block before:absolute before:translate-x-full before:inset-0 before:bg-[#8ea7e9] before:hover:translate-x-0  before:duration-300 before:rounded-s-full before:-z-10 after:-z-10 after:rounded-e-full after:duration-300 after:hover:translate-x-0 after:block after:absolute after:-translate-x-full after:inset-0 after:bg-[#8ea7e9] relative inline-block hover:text-white z-50">Submit</button>
   </form>
 </div></>
    );
};

export default Register;