
# SMS Debt Bot

Una sencilla aplicación que te permite enviar un SMS a tu deudor para persuadirlo a que te pague la deuda.

La mayoría de casas de cobranza utilizan lo que ellos llaman el cobro persuasivo que consiste en realizar llamadas, enviar SMS y correos electrónicos a los deudores de forma masiva. Para ello utilizan diferentes plataformas que les permiten programar diferentes mensajes que se pueden enviar automáticamente a su base de datos de deudores para fomentar el pago de los valores adeudados.

Esta aplicación creada en Next.js 14 te permite enviar un SMS al número que le indiques utilizando la API de Twilio.

## Tecnologías usadas

Next.js 14 con App Router, Typescript y TailwindCSS

## Enlaces de interés

- [Documentación de la API de Twilio](https://www.twilio.com/docs/messaging)
- [Límite de caracteres SMS](https://www.twilio.com/docs/glossary/what-sms-character-limit)

## Instalación

Clona el repositorio

```bash
  git clone https://github.com/joseuribeh98/sms-debt-bot.git
```

Accede a la carpeta del repositorio

```bash
  cd sms-debt-bot
```

Instala las dependencias

```bash
  pnpm install
```

Copia el archivo de ejemplo para las variables de entorno

```bash
  cp .env.example .env
```

Modifica tus variables de entorno

```makefile
# Twilio API credentials
TWILIO_ACCOUNT_SID=Your Twilio Account SID
TWILIO_AUTH_TOKEN=Your Twilio Auth Token
```

Ejecutar la aplicación

```bash
  pnpm run dev
```

Este comando iniciará un servidor de desarrollo local y te proporcionará una URL donde puedes ver la aplicación en funcionamiento, usualmente es <http://localhost:3000>.

## Uso

Al acceder a la app verás un formulario donde te pide:

**Número desde el que envías:**

Debe ser un número válido configurado en tu cuenta de Twilio y que permita el envío de SMS. Recuerda añadir el indicativo de país.

**Número del deudor:**

El número de la persona a la que le quieres envíar el mensaje. Recuerda que debe tener el indicativo de país. Puedes enviarlo con el + o sin el, pero no puede tener espacios.

**Mensaje que le envías:**

Aquí es donde pones el cuerpo del mensaje. Recuerda que Twilio cobra por segmento de SMS. Cada segmento tiene una longitud de 160 caracteres siempre que no se usen emojis o caracteres chinos (En este caso cada segmento tiene una longitud máxima de 70 caracteres). Si el mensaje excede los 160 caracteres entonces se enviarán dos mensajes con una longitud de 153 caracteres por segmento y el dispositivo del deudor es el que se encarga de juntarlos para que se vean como uno solo. Pero Twilio cobrará 2 segmentos. Revisa los enlaces de interés para tener más información al respecto.

## Referencia de la API creada

Recibe los mismos parámetros que la API de Twilio para el envío de mensajes.

### Enviar SMS

```http
  POST /api/send
```

| Parametro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `from` | `string` | **Requerido**. Número desde el que se envía el SMS |
| `to` | `string` | **Requerido**. Número al que se envía el SMS |
| `body` | `string` | **Requerido**. Texto del mensaje. 160 caracteres por segmento. 320 caracteres máximo recomendado |

## Contribuciones

Esta aplicación está en su primera versión y se adecua justo a lo que necesitaba en el momento. Sin embargo se me ocurren algunas ideas que se podrían agregar para hacerla más robusta y funcional.

- Añadir una lista de mensajes predeterminados y personalizados -con un campo adicional que reciba el nombre del deudor para que se use en las plantillas del mensaje-.
- Añadir la funcionalida para programar el envío del mensaje a una fecha determinada o por un periodo determinado.
- Añadir un registro de los mensajes enviados. (Esto requeriría la conexión a una base de datos que guarde esos registros)

Si te gusta el proyecto y quieres mejorarlo, no dudes en hacer un PR.
