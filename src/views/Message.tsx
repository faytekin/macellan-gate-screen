import classes from './Message.module.css'

import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const Message: React.FC = () => {
    return (
        <div className={`${classes.container} bg-gradient-to-bl from-indigo-900 to-purple-900`}>
            <h1>
                <span style={{ color: 'white' }}>
                    <span style={{ color: '#e06c75' }}>console</span>.
                </span>
                <span style={{ color: '#61afef' }}>log</span>("
            </h1>
            <div>
                <TypeAnimation
                    cursor={false}
                    className={classes.cursor}
                    sequence={[
                        'Hoşgeldin',
                        2500,
                        'Welcome',
                        2500,
                        'Bienvenido',
                        2500,
                        'Willkommen',
                        2500,
                        'ようこそ',
                        2500,
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ display: 'inline-block' }}
                    repeat={Infinity}
                />
            </div>
            <h1 className={classes.closure}>");</h1>
        </div>
    )
}

export default Message
