import React from 'react'
import { APP_NAME } from '../../app-constants'

export default () => {
    return (
        <div className="about-box">
            <h1 className="display-4 about__header">
                About <strong className="text-danger">{`${APP_NAME}`}</strong>
            </h1>
            <p className="lead about__lead">
                This is a simple react app to manage the contacts.
                It uses dummy data from <a target="_blank" href="https://jsonplaceholder.typicode.com/">https://jsonplaceholder.typicode.com/</a>
            </p>
            <p className="text-secondary about__extra">
                Version: 1.0.0
            </p>
        </div>
    )
}
