import { useAppSelector, useAppDispatch } from '@/redux/hooks'


export default function ComprasTable(){ 
    const ventas = useAppSelector((state)=> state.compras)
    return (
        <div className="bg-white flex flex-col p-8 gap-4">
            <div className="text-lg text-bold">
                <h2>Listado de compras realizadas</h2>
            </div>
            <div  className="p-2 shadow-lg rounded-lg h-2xl">
                <table className="table table-auto min-w-full leading-normal">
                    <thead className="bg-gray-400 text-white 2-full " >
                        <tr className=""> 
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">#Orden</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Pelicula</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"># asientos</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Sala</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Detalle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((e)=> {
                            return (<tr className="hover:bg-gray-200">
                             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                 <p className="text-gray-900 whitespace-no-wrap">
                                    Orden #
                                </p >
                                <p className="text-gray-600 whitespace-no-wrap">00000</p>
                             </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {e.movieId}
                                </p >
                             </td>
                             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    Cantidad de asientos: 
                                </p >
                                <p className="text-gray-600 whitespace-no-wrap">{e.seats.length} asientos</p>
                             </td>

                             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    Sala
                                </p >
                                <p className="text-gray-600 whitespace-no-wrap">{e.theatherId}</p>
                             </td>


                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span
                                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                >
                                <span
                                    aria-hidden
                                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full hover:cursor-pointer"
                                ></span>
                                <span className="relative hover:cursor-pointer">Detalle de asientos</span>
                                </span>
                            </td>
                        </tr>)
                        })}                        
                    </tbody>
                </table>
            </div>
       </div>
    ); 
}