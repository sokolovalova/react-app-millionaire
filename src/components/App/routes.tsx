import * as React from 'react';
import { Redirect, RouteChildrenProps } from 'react-router-dom';
import {App} from './App';
import {Quiz} from '../Quiz';
import {Results} from '../Results';
import {Start} from '../Start';


export interface Routes {
    path: URL_ROUTES;
    render: (props: RouteChildrenProps) => any,
    title?: string;
    exact?: boolean;
    isHidden?: boolean;
    isProtected?: boolean;
}

export enum URL_ROUTES {
    START = '/millionaire-quiz',
    QUIZ = '/millionaire-quiz/quiz',
    RESULTS = '/millionaire-quiz/results'
}

export const ROUTES: Array<Routes> = [
    {
        path:URL_ROUTES.START,
        render: (props: RouteChildrenProps) => <Start {...props} />,
        title: 'Start',
        exact:true
    },
    {
        path:URL_ROUTES.QUIZ,
        render: (props: RouteChildrenProps) => <Quiz {...props} />,
        title: 'Quiz',
        exact:true
    },
    {
        path: URL_ROUTES.RESULTS,
        exact: true,
        render: (props: any) => <Results {...props} />,
        title: 'Results',
        isProtected: true
    }

]