import React, { useEffect } from 'react';
import './home.css'
import { useForm } from "react-hook-form";
import axios from 'axios';
import emailjs from 'emailjs-com';
export default function Home() {

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        //const res = axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=125102&date=${newDate}`);
        //console.log(res);
    };
    setInterval(() => {
        let date = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
        let newDate = date.split('-').reverse().join('-')
        const res = axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=125102&date=${newDate}`);
        if (res.data === undefined) {
            console.log("Seat Not Available");
        } else {
            sendmails();
        }
    }, 300000);

    function sendmails() {
        emailjs.send('service_xhu3pdg', 'template_le0xwjb', { email: 'tkarnani2410@gmail.com' }, 'user_VLM2P4WaWuygLJCkgroMY')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }
    return (
        <div className="main">
            <h3>Vaccine Booking Notification App</h3>
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Zip/Pin code" {...register("pin_code")} />
                    </div>
                    <div className="col">
                        <input type="date" className="form-control" {...register("date")} />
                    </div>
                </div>
                <br></br>
                <button type="submit" className="btn btn-primary button_css">Submit</button>
            </form>
        </div>
    );
}