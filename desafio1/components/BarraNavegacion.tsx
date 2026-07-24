import Link from "next/link";


export default function NavigationBarSS(){

    return (
<nav className="fixed bottom-0 inset-x-0 bg-blue-100 flex justify-between text-sm text-green-900 uppercase font-mono">

  <Link href="." className="w-full block py-5 px-3 text-center hover:bg-green-200 hover:text-green-800 transition duration-300">
    <svg className="w-6 h-6 mb-2 mx-auto" fill="#000000" viewBox="0 -13.54 122.88 122.88" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" >
      <g id="SVGRepo_iconCarrier"> 
        <g> 
          <path d="M12.14,0H32.8h29.43h28.8h19.71c3.34,0,6.38,1.37,8.58,3.56c2.2,2.2,3.56,5.24,3.56,8.58v7.13v57.25v7.09 c0,3.34-1.37,6.38-3.56,8.58c-2.2,2.2-5.24,3.56-8.58,3.56h-19.2c-0.16,0.03-0.33,0.04-0.51,0.04c-0.17,0-0.34-0.01-0.51-0.04 H62.74c-0.16,0.03-0.33,0.04-0.51,0.04c-0.17,0-0.34-0.01-0.51-0.04H33.31c-0.16,0.03-0.33,0.04-0.51,0.04 c-0.17,0-0.34-0.01-0.51-0.04H12.14c-3.34,0-6.38-1.37-8.58-3.56S0,86.95,0,83.61v-7.09V19.27v-7.13C0,8.8,1.37,5.76,3.56,3.56 C5.76,1.37,8.8,0,12.14,0L12.14,0z M55.19,31.24l20.53,14.32c0.32,0.2,0.61,0.48,0.84,0.81c0.92,1.33,0.58,3.14-0.74,4.06 L55.37,64.57c-0.5,0.41-1.15,0.66-1.85,0.66c-1.62,0-2.93-1.31-2.93-2.93V33.63h0.01c0-0.58,0.17-1.16,0.52-1.67 C52.05,30.64,53.87,30.32,55.19,31.24L55.19,31.24z M93.95,79.45V89.9h16.78c1.73,0,3.3-0.71,4.44-1.85 c1.14-1.14,1.85-2.71,1.85-4.44v-4.16H93.95L93.95,79.45z M88.1,89.9V79.45H65.16V89.9H88.1L88.1,89.9z M59.31,89.9V79.45H35.73 V89.9H59.31L59.31,89.9z M29.87,89.9V79.45H5.85v4.16c0,1.73,0.71,3.3,1.85,4.44c1.14,1.14,2.71,1.85,4.44,1.85H29.87L29.87,89.9z M5.85,73.6H32.8h29.43h28.8h26V22.2h-26h-28.8H32.8H5.85V73.6L5.85,73.6z M88.1,16.35V5.85H65.16v10.49H88.1L88.1,16.35z M93.95,5.85v10.49h23.07v-4.2c0-1.73-0.71-3.3-1.85-4.44c-1.14-1.14-2.71-1.85-4.44-1.85H93.95L93.95,5.85z M59.31,16.35V5.85 H35.73v10.49H59.31L59.31,16.35z M29.87,16.35V5.85H12.14c-1.73,0-3.3,0.71-4.44,1.85c-1.14,1.14-1.85,2.71-1.85,4.44v4.2H29.87 L29.87,16.35z"></path>
        </g> 
      </g>
    </svg>
    Cartelera
  </Link>

  <a href="./ventas" className="w-full block py-5 px-3 text-center hover:bg-green-200 hover:text-blue-800">
    <svg  className="w-6 h-6 mb-2 mx-auto" 
    xmlns="http://www.w3.org/2000/svg" fill="none" 
    viewBox="0 0 24 24" stroke="currentColor" >
      <g id="SVGRepo_iconCarrier"> 
          <path d="M5 12.0002C5 10.694 4.16519 9.58273 3 9.1709V7.6C3 7.03995 3 6.75992 3.10899 6.54601C3.20487 6.35785 3.35785 6.20487 3.54601 6.10899C3.75992 6 4.03995 6 4.6 6H19.4C19.9601 6 20.2401 6 20.454 6.10899C20.6422 6.20487 20.7951 6.35785 20.891 6.54601C21 6.75992 21 7.03995 21 7.6V9.17071C19.8348 9.58254 19 10.694 19 12.0002C19 13.3064 19.8348 14.4175 21 14.8293V16.4C21 16.9601 21 17.2401 20.891 17.454C20.7951 17.6422 20.6422 17.7951 20.454 17.891C20.2401 18 19.9601 18 19.4 18H4.6C4.03995 18 3.75992 18 3.54601 17.891C3.35785 17.7951 3.20487 17.6422 3.10899 17.454C3 17.2401 3 16.9601 3 16.4V14.8295C4.16519 14.4177 5 13.3064 5 12.0002Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      </g>
     </svg>
    Boletos
  </a>

  <a href="#" className="w-full block py-5 px-3 text-center hover:bg-blue-200 hover:text-blue-800">
    <svg className="w-6 h-6 mb-2 mx-auto" 
    xmlns="http://www.w3.org/2000/svg"
     fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
    </svg>
    Profile
  </a>

  <a href="#" className="w-full block py-5 px-3 text-center hover:bg-blue-200 hover:text-blue-800">
    <svg className="w-6 h-6 mb-2 mx-auto" xmlns="http://www.w3.org/2000/svg"
     fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    </svg>
    Settings
  </a>

</nav>
 )
}