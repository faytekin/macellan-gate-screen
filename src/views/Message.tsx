import classes from './Message.module.css'

import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const Message: React.FC = () => {
    return (
        <div className={`${classes.container} bg-gradient-to-br from-indigo-900 to-purple-900`}>
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
                        1000,
                        'Welcome',
                        1000,
                        'Bienvenido',
                        1000,
                        'Willkommen',
                        1000,
                        'ようこそ',
                        1000,
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
