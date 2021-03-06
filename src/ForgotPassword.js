import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from './AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    
    async function handleSubmit(e) {
        e.preventDefault()

        try{
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("sprawdź email")
        }
        catch{
            setError('Failed to reset')
        }
        setLoading(false)

    }

    return (
        <Container className="mt-5">
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">
                        Zapomniałeś hasła?
                    </h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="info">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required ref={emailRef}></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} type="submit" className="mt-3">Zresetuj hasło</Button>
                    </Form>

                    <div className="w-100 text-center mt-3"> 
                        Już pamiętasz? <Link to="/login">Zaloguj się</Link>
                    </div>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                Nie masz jeszcze konta? <Link to="/signup"> Wpisz się!</Link>
            </div>
        
        </Container>

        )
}
