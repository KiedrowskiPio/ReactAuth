import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from './AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useNavigate()



    
    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try{
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        }
        catch{
            setError('Failed to Create account')
        }
        setLoading(false)

    }

    return (
        <Container className="mt-5">
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">
                        Wpisz się 
                    </h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required ref={emailRef}></Form.Control>
                        </Form.Group>

                        <Form.Group className="mt-3" id="password">
                            <Form.Label>Hasło</Form.Label>
                            <Form.Control type="password" required ref={passwordRef}></Form.Control>
                        </Form.Group>
                        
                        <Form.Group className="mt-3" id="password-confirm">
                            <Form.Label>Potwierdź hasło</Form.Label>
                            <Form.Control type="password" required ref={passwordConfirmRef}></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} type="submit" className="mt-3">Wpisz się</Button>
                    </Form>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                Masz już konto? <Link to="/login">Zaloguj się</Link>
            </div>
        
        </Container>

        )
}
