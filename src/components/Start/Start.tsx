import * as React from 'react';
import { Link } from 'react-router-dom';
import { URL_ROUTES } from '../App/routes';
import './Start.css';
export class Start extends React.Component {


    render() {
        return (
            <div className="background">
                <div className="content">

                    <div >
                        <img className="handImg" src="https://hsto.org/webt/br/x-/f3/brx-f3_e1ajl1icshjfagettecy.png" alt="" />
                    </div>
                    <div className="text">
                        <h1>
                            Who wants to be a millionaire?
                        </h1>
                        <div className="btn-conteiner">
                        <Link className="start-btn" to={URL_ROUTES.QUIZ}>Start</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


