import React, { useState } from "react";
import { gql, useMutation } from '@apollo/client'
import { useFormik } from 'formik'// QUE ES PARA LOS FORMULARIOS
import { useRouter } from 'next/router'
import NotificationProblem from "./NotificationProblem"
//import { useState } from 'react'
import * as Yup from 'yup'
const hours = new Date()
const NotificationSchema = Yup.object().shape({
  boxNotify: Yup.string().required(''),
  dateNotify: Yup.string().required(''),
  timeNotification: Yup.string().required(''),
  userNotification: Yup.string().required(''),
  notification: Yup.string().required('')
})
const NotificationCreate = gql`
    mutation Notification($boxNotify: String, $dateNotify: String, $timeNotification: String, $userNotification: String, $notification: String) {
        createNotifyContingencies(boxNotify: $boxNotify, dateNotify: $dateNotify, timeNotification: $timeNotification, userNotification: $userNotification, notification: $notification) {
            id
            boxNotify
            dateNotify
            timeNotification
            userNotification
            notification
  }
}
`




const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter()
  const [notificationCreate, { loading, error }] = useMutation(NotificationCreate, {
    refetchQueries: ['NotifyContingencies'],
    onCompleted: (data) => {
      router.push('/modal')
    }
  })
  const formik = useFormik({
    initialValues: {
      boxNotify: '',
      dateNotify: hours.toLocaleDateString(),
      timeNotification: hours.getHours().toString() + ":" + hours.getMinutes().toString() + ":" + hours.getSeconds().toString(),
      userNotification: '',
      notification: ''
    },
    validationSchema: NotificationSchema,
    onSubmit: async (values) => {
      console.log(values)
      await notificationCreate({ variables: values })
    }
  })
  if (loading) {
    return <h1>Cargando Notificaciones...</h1>
  }
  if (error) {
    return <p>{JSON.stringify(error)}</p>
  }

  return (
    <>
      <button
        className="bg-french-raspberry text-white active:bg-blue-500 
      font-bold mx-6 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Crear Notificacion
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">General Info</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div>
                  <div className='w-full max-w-xs'>
                    <form className='bg-white w-full max-w-lg px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
                      <div>
                        <div className='w-full ms:w1/2 px-3 mb-6 md:mb-0'>
                          <label className='className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                            Ingrese el Box
                          </label>
                          <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type="text" name="boxNotify" placeholder='Ingrese el box que tiene el problema' onChange={formik.handleChange} value={formik.values.boxNotify} required />
                        </div>

                        <div className='w-full ms:w1/2 px-3 mb-6 md:mb-0'>
                          <label className='className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                            Rut/Run
                          </label>
                          <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type="text" name="userNotification" placeholder='Ingrese el rut del usuario' onChange={formik.handleChange} value={formik.values.userNotification} required />
                        </div>

                        <div className='w-full ms:w1/2 px-3 mb-6 md:mb-0'>
                          <textarea className='flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent' type="text" name="notification" placeholder='notification' onChange={formik.handleChange} value={formik.values.notification} required />

                        </div>


                      </div>
                      <div className="flex items-center justify-between mt-4">

                      <div className="flex items-center justify-between mt-4 ">
                        <button
                          className="shadow bg-white hover:shadow-lg focus:shadow-outline focus:outline-none text-french-raspberry font-bold py-2 px-4 rounded"
                          type="button"
                          onClick={() => setShowModal(false)}
                          >
                          Cerrar
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <button className='shadow bg-french-raspberry hover:shadow-lg focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' type='submit'>Enviar</button>
                      </div>
                          </div>

                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;