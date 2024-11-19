import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';



import 'bootstrap/dist/css/bootstrap.min.css';
import ListaPersona from './pages/persona/ListaPersona';
import FormPersona from './pages/persona/FormPersona';
import FormUsuario from './pages/usuario/FormUsuario';
import ListaUsuario from './pages/usuario/ListaUsuario';
import ListaCliente from './pages/cliente/ListaCliente';
import FormCliente from './pages/cliente/FormCliente';
import ListaProveedor from './pages/proveedor/ListaProveedor';
import FormProveedor from './pages/proveedor/FormProveedor';
import ListaTipoProducto from './pages/tipoProducto/ListaTipoProducto';
import FormTipoProducto from './pages/tipoProducto/FormTipoProducto';
import ListaProducto from './pages/productos/ListaProducto';
import FormProducto from './pages/productos/FormProducto';
import ListaInventario from './pages/inventario/ListaInventario';
import FormInventario from './pages/inventario/FormInventario';
import ListaCompra from './pages/compra/ListaCompra';
import FormCompra from './pages/compra/FormCompra';
import ListaTipoServicio from './pages/tipoServicio/ListaTipoServicio';
import FormTipoServicio from './pages/tipoServicio/FormTipoServicio';
import ListaServicio from './pages/servicio/ListaServicio';
import FormServicio from './pages/servicio/FormServicio';


const router = createBrowserRouter([
  { path: '/', 
    element: <ListaPersona />
  },
  { path: '/personas', 
    element: <ListaPersona />
  },
  { path: '/persona/:id', 
    element: <FormPersona />
  },
  { path: '/persona', 
    element: <FormPersona />
  },
  { path: '/usuarios/:id', 
    element: <FormUsuario />
  },
  { path: '/usuario', 
    element: <FormUsuario />
  },
  { path: '/usuariolist', 
    element: <ListaUsuario />
  },

  { path: '/clientelist', 
    element: <ListaCliente />
  },
  { path: '/cliente', 
    element: <FormCliente />
  },
  { path: '/cliente/:id', 
    element: <FormCliente />
  },

  { path: '/proveedorlist', 
    element: <ListaProveedor />
  },
  { path: '/proveedor', 
    element: <FormProveedor />
  },
  { path: '/proveedor/:id', 
    element: <FormProveedor />
  },

  { path: '/tipo_productolist', 
    element: <ListaTipoProducto />
  },
  { path: '/tipo_producto', 
    element: <FormTipoProducto />
  },
  { path: '/tipo_producto/:id', 
    element: <FormTipoProducto />
  },
  
  { path: '/productolist', 
    element: <ListaProducto />
  },
  { path: '/producto', 
    element: <FormProducto />
  },
  { path: '/producto/:id', 
    element: <FormProducto />
  },

  { path: '/inventariolist', 
    element: <ListaInventario />
  },
  { path: '/inventario', 
    element: <FormInventario />
  },
  { path: '/inventario/:id', 
    element: <FormInventario />
  },


  { path: '/compralist', 
    element: <ListaCompra />
  },
  { path: '/compra', 
    element: <FormCompra />
  },
  { path: '/compra/:id', 
    element: <FormCompra />
  },


  { path: '/tipo_serviciolist', 
    element: <ListaTipoServicio/>
  },
  { path: '/tipo_servicio', 
    element: <FormTipoServicio />
  },
  { path: '/tipo_servicio/:id', 
    element: <FormTipoServicio />
  },


  { path: '/serviciolist', 
    element: <ListaServicio/>
  },
  { path: '/servicio', 
    element: <FormServicio />
  },
  { path: '/servicio/:id', 
    element: <FormServicio />
  },

  //{ path: '/album', element: <AlbumsPage /> },
  //{ path: '/artists', element: <ArtistsPage /> },
  //{ path: '/generos', element: <GenresPage /> },
  //{ path: '/artista-view', element: <ArtistView />},
  //
  //{ path: '/album-view', element: <AlbumView /> },
  //{ path: '/album/:albumId', element: <AlbumDetail />},
  //{ path: '/artist/:artistId', element: <ArtistDetail/>},
  //{ path: '/generos-view', element: <GenerosView/>},
  //{ path: '/generos/:generoId', element: < GeneroDetail/>}



  
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
