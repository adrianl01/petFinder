import BottomNavigation from "./layout/BottomNavigation";

export default function AuthScreen(){
return(
<div className="min-h-screen flex flex-col justify-center bg-stone-50 px-6">
<div className="text-center mb-8">
<div className="w-16 h-16 bg-orange-500 rounded-2xl mx-auto flex items-center justify-center text-white text-3xl">
🐾
</div>
<h1 className="text-3xl font-bold mt-4">Bienvenido</h1>
<p className="text-gray-500 mt-2">
Ingresá para reportar y recibir alertas.
</p>
</div>

<div className="space-y-4">
<input className="w-full border rounded-xl p-3" placeholder="Email" />
<input className="w-full border rounded-xl p-3" placeholder="Contraseña" type="password" />

<button className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold">
Iniciar sesión
</button>

<button className="w-full border py-4 rounded-2xl font-semibold">
Continuar con Google
</button>
</div>

<BottomNavigation />
</div>
)}