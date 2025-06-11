# Wallet Tracker

Una app simple y minimalista para llevar el control de tus billeteras, totales, deudas y transacciones personales.

## Características

- **Gestión de billeteras:** Agrega, edita y elimina diferentes billeteras (Efectivo, Mercado Pago, etc.).
- **Totales personalizados:** Lleva el control de distintos totales y categorías.
- **Registro de transacciones:** Añade, edita y elimina movimientos, eligiendo de qué billetera y total salen.
- **Control de deudas:** Registra y edita deudas, y márcalas como pagadas.
- **Notas rápidas:** Escribe y guarda notas personales.
- **Tema oscuro:** Interfaz moderna y minimalista, optimizada para uso nocturno.
- **Persistencia local:** Todos los datos se guardan automáticamente en el dispositivo.

## Instalación

1. Clona el repositorio:

   ```sh
   git clone https://github.com/tuusuario/wallet-tracker.git
   cd wallet-tracker
   ```

2. Instala las dependencias:

   ```sh
   npm install
   ```

3. Inicia la app en modo desarrollo:
   ```sh
   npm start
   ```
   o usando Expo:
   ```sh
   expo start
   ```

## Estructura del proyecto

```
src/
  Components/      # Componentes reutilizables (billeteras, totales, etc.)
  Context/         # Contextos globales para datos persistentes
  Navigation/      # Navegación de pantallas
  Screens/         # Pantallas principales de la app
  Utils/           # Utilidades y constantes (colores, etc.)
assets/            # Iconos, splash y recursos gráficos
```

## Personalización

- **Nombre e icono:** Edita `app.json` para cambiar el nombre y el icono de la app.
- **Colores:** Modifica `src/Utils/Colors.ts` para adaptar la paleta a tu gusto.

## Construcción y publicación

- Para compilar la app para producción, usa [EAS Build](https://docs.expo.dev/build/introduction/) o el comando `expo build`.
- Recuerda probar la app en dispositivos reales antes de publicar.

## Créditos

Desarrollado por Santiago Usaj.

---

¡Gracias por usar Wallet Tracker!
