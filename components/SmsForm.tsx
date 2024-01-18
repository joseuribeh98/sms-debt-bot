'use client'
import { useState } from 'react';

export default function SmsForm() {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSendSms = async (from: string, to: string, body: string) => {
        console.log({ from, to, body })
        if (!from || !to || !body) {
            setError(true);
            console.log('Por favor, complete todos los campos');
            setTimeout(() => {
                setError(false);
            }, 2000);
            return;
        }

        try {
            const res = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ from, to, body }),
            });

            const data = await res.json();
            if (res.ok) {
                setSuccess(true);
                console.log('Mensaje enviado con éxito: ', data.message);
                setTimeout(() => {
                    setSuccess(false);
                }, 2000);
            } else {
                console.log(`Error: ${data.message}`);
            }
        } catch (error) {
            console.log('Error al enviar el mensaje');
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSendSms(from, to, body);
    };

    return (
        <div className='bg-zinc-200 p-8 rounded-xl shadow-lg w-full md:w-1/2 lg:w-1/3'>
            <div className='w-full flex flex-col pb-4'>
                <h1 className='text-2xl font-bold text-center'>SMS Debt Bot</h1>
                <span className='text-pretty text-xs text-center'> Envía un mensaje de texto a tu deudor para que te pague cuanto antes</span>
                {error &&
                    <div className='flex flex-col items-center justify-center p-4 rounded-xl mt-2 bg-zinc-100'>
                        <p className='text-red-500 text-sm text-center font-semibold'>Completa todos los campos</p>
                    </div>
                }
                {success &&
                    <div className='flex flex-col items-center justify-center p-4 rounded-xl mt-2 bg-zinc-100'>
                        <p className='text-green-500 text-sm text-center font-semibold'>Mensaje enviado con éxito</p>
                    </div>
                }
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col w-full gap-2 '>
                <label htmlFor="from" className='flex flex-col'>
                    <span className='font-semibold'>Número desde el que envías</span>
                    <span className='text-pretty text-xs'> (Debe ser un número registrado en Twilio)</span>
                </label>
                <input
                    type='text'
                    id="from"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className='p-2 rounded-md text-sm'
                />

                <label htmlFor="to" className='flex flex-col'>
                    <span className='font-semibold'>Número del deudor 😠</span>
                    <span className='text-pretty text-xs'> Recuerda agregar el indicativo de país. (Por ejemplo: +57)</span>
                </label>
                <input
                    type="text"
                    id="to"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className='p-2 rounded-md text-sm'
                />
                <label htmlFor="body" className='flex flex-col'>
                    <span className='font-semibold'>Mensaje que le envías</span>
                    <span className='text-pretty text-xs'>
                        Máximo 320 caractéres.
                    </span>
                </label>
                <textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder='[DEUDOR] ante la negativa de su pago hemos tomado la decisión de iniciar Proceso de Cobro Pre-jurídico para su obligación. Por favor comuníquese con nosotros al 1234567890 para llegar a un acuerdo de pago.'
                    className='p-2 rounded-md text-sm h-28'
                    maxLength={320}
                />
                <a className='text-pretty text-xs text-blue-500 underline' href='https://www.twilio.com/docs/glossary/what-sms-character-limit' target='_blank'>Documentación de Twilio sobre el límite de caractéres</a>
                <button
                    type="submit"
                    className='bg-zinc-500 text-white p-2 rounded-md text-sm'
                >
                    Envía el SMS
                </button>

                <p className='text-pretty text-xs text-center'>Esta aplicación usa la API de Twilio para enviar mensajes de texto. <br /> <a className='text-blue-500 underline' href='https://www.twilio.com/legal/tos' target='_blank'>Términos de servicio de Twilio</a></p>

            </form>
        </div>
    )
}

