export default function ReportScreen(){
return(
<div className="min-h-screen bg-stone-50">
<header className="bg-white border-b p-4">
<h1 className="font-bold text-xl">Reportar mascota</h1>
</header>

<form className="p-5 space-y-4">
<div className="h-36 border-2 border-dashed border-orange-300 rounded-2xl flex items-center justify-center">
Subir foto
</div>

<input className="w-full border rounded-xl p-3" placeholder="Nombre de la mascota" />
<input className="w-full border rounded-xl p-3" placeholder="Raza" />

<div className="grid grid-cols-2 gap-3">
<input className="border rounded-xl p-3" placeholder="Color" />
<input className="border rounded-xl p-3" placeholder="Edad" />
</div>

<div className="h-32 rounded-2xl bg-emerald-100 flex items-center justify-center">
Mapa
</div>

<button className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold">
Publicar reporte
</button>
</form>
</div>
)}