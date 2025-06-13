export const limpiarFormulario = (params: {
  ssetFormData: (data: { ip: string; nombre: string; cedula: string; sucursal: string }) => void;
  setPunto_venta: (value: string) => void;
  setCategorizacion: (value: string) => void;
  setSupervisor: (value: any) => void;
  setrequisito: (value: string) => void;
  setlatitude: (value: number | undefined) => void;
  setlongitude: (value: number | undefined) => void;

  // Campos de Entrega/Salida efectivo
  setVenta_bruta: (value: string) => void;
  setBase_efectivo: (value: string) => void;
  setCartera: (value: string) => void;
  setChance_abonados: (value: string) => void;
  setChance_impresos: (value: string) => void;
  setPremios_pagados: (value: string) => void;
  setEfectivo_cajafuerte: (value: string) => void;
  setTirilla_recaudo: (value: string) => void;
  setTotal_monedas: (value: string) => void;
  setTotal_billetes: (value: string) => void;

  // Campos de Caja/Rollos
  setTotal_monedasCaja: (value: string) => void;
  setTotal_billetesCaja: (value: string) => void;
  setTotal_premiosCaja: (value: string) => void;
  setRollos_bnet: (value: string) => void;
  setRollos_fisicos: (value: string) => void;

  // Campos de Raspas (Juego 1-7)
  setnombre_juego: (value: string) => void;
  setcantidad_bnet: (value: string) => void;
  setcantidad_fisicos: (value: string) => void;
  setcantidad_faltante: (value: string) => void;
  setcantidad_tiquete: (value: string) => void;
  setdescargado: (value: string) => void;

  setnombre_juego2: (value: string) => void;
  setcantidad_bnet2: (value: string) => void;
  setcantidad_fisicos2: (value: string) => void;
  setcantidad_faltante2: (value: string) => void;
  setcantidad_tiquete2: (value: string) => void;
  setdescargado2: (value: string) => void;

  setnombre_juego3: (value: string) => void;
  setcantidad_bnet3: (value: string) => void;
  setcantidad_fisicos3: (value: string) => void;
  setcantidad_faltante3: (value: string) => void;
  setcantidad_tiquete3: (value: string) => void;
  setdescargado3: (value: string) => void;

  setnombre_juego4: (value: string) => void;
  setcantidad_bnet4: (value: string) => void;
  setcantidad_fisicos4: (value: string) => void;
  setcantidad_faltante4: (value: string) => void;
  setcantidad_tiquete4: (value: string) => void;
  setdescargado4: (value: string) => void;

  setnombre_juego5: (value: string) => void;
  setcantidad_bnet5: (value: string) => void;
  setcantidad_fisicos5: (value: string) => void;
  setcantidad_faltante5: (value: string) => void;
  setcantidad_tiquete5: (value: string) => void;
  setdescargado5: (value: string) => void;

  setnombre_juego6: (value: string) => void;
  setcantidad_bnet6: (value: string) => void;
  setcantidad_fisicos6: (value: string) => void;
  setcantidad_faltante6: (value: string) => void;
  setcantidad_tiquete6: (value: string) => void;
  setdescargado6: (value: string) => void;

  setnombre_juego7: (value: string) => void;
  setcantidad_bnet7: (value: string) => void;
  setcantidad_fisicos7: (value: string) => void;
  setcantidad_faltante7: (value: string) => void;
  setcantidad_tiquete7: (value: string) => void;
  setdescargado7: (value: string) => void;

  // Resto de los setters...
  [key: string]: any;
}) => {
  params.setFormData({ ip: '', nombre: '', cedula: '', sucursal: '' });
  params.setPunto_venta('');
  params.setCategorizacion('');
  params.setSupervisor('');
  params.setrequisito('');
  params.setlatitude(undefined);
  params.setlongitude(undefined);

  params.setVenta_bruta('');
  params.setBase_efectivo('');
  params.setCartera('');
  params.setChance_abonados('');
  params.setChance_impresos('');
  params.setPremios_pagados('');
  params.setEfectivo_cajafuerte('');
  params.setTirilla_recaudo('');
  params.setTotal_monedas('');
  params.setTotal_billetes('');
  params.setTotal_monedasCaja('');
  params.setTotal_billetesCaja('');
  params.setTotal_premiosCaja('');
  params.setRollos_bnet('');
  params.setRollos_fisicos('');

  params.setnombre_juego('');
  params.setcantidad_bnet('');
  params.setcantidad_fisicos('');
  params.setcantidad_faltante('');
  params.setcantidad_tiquete('');
  params.setdescargado('');

  params.setnombre_juego2('');
  params.setcantidad_bnet2('');
  params.setcantidad_fisicos2('');
  params.setcantidad_faltante2('');
  params.setcantidad_tiquete2('');
  params.setdescargado2('');

  params.setnombre_juego3('');
  params.setcantidad_bnet3('');
  params.setcantidad_fisicos3('');
  params.setcantidad_faltante3('');
  params.setcantidad_tiquete3('');
  params.setdescargado3('');

  params.setnombre_juego4('');
  params.setcantidad_bnet4('');
  params.setcantidad_fisicos4('');
  params.setcantidad_faltante4('');
  params.setcantidad_tiquete4('');
  params.setdescargado4('');

  params.setnombre_juego5('');
  params.setcantidad_bnet5('');
  params.setcantidad_fisicos5('');
  params.setcantidad_faltante5('');
  params.setcantidad_tiquete5('');
  params.setdescargado5('');

  params.setnombre_juego6('');
  params.setcantidad_bnet6('');
  params.setcantidad_fisicos6('');
  params.setcantidad_faltante6('');
  params.setcantidad_tiquete6('');
  params.setdescargado6('');

  params.setnombre_juego7('');
  params.setcantidad_bnet7('');
  params.setcantidad_fisicos7('');
  params.setcantidad_faltante7('');
  params.setcantidad_tiquete7('');
  params.setdescargado7('');

  params.setImage(null);
};