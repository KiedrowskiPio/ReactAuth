import React, { useEffect, useState } from 'react'
import { Card, Navbar, Button, Alert, Container, Form, Row, Col, ListGroup } from 'react-bootstrap'
import { useAuth } from './AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { getDatabase, ref, onValue, push, remove } from 'firebase/database'
import app, { auth } from './firebase'



const db = getDatabase(app)



export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useNavigate()
    const [notes, setNotes] = useState([])
    const [noteContent, setNoteContent] = useState('')
    

    useEffect(() => {
        
        const notesRef = ref(db, 'Notes/' + auth.currentUser.uid)  
        onValue(notesRef, snapshot => {
            const data = snapshot.toJSON()
    
            if(data != null) {
                const lista = Object.keys(data).map(key => ({id: key, content: data[key]}));
                setNotes(lista)
            }
            else {
                setNotes([])
            }
        })
    }, [])

    async function handleLogout(){
        setError("")

        try{
            await  logout()
            history("/login")
        } catch {
            setError("failed to log out")
        }
    }

    async function handleAddNote(){
        setError("")
        
        const notesRef = ref(db, 'Notes/' + auth.currentUser.uid)

        try{
            await push(notesRef, noteContent)
        } catch {
            setError("failed to add note")
        }
    }
    
    async function handleDeleteNote(id){
        setError("")

        try{
            await remove(ref(db, 'Notes/'+ auth.currentUser.uid + '/' + id))
        } catch {
            setError("failed to delete note")
        }
    }

    return (
        <>
                <Navbar bg='white' className='allign-items-center justify-content-center border-bottom border-dark pt-2 mt-2 '>
                    <Container>
                        <Navbar.Brand className='justify-content-middle'>
                            <Navbar.Text>
                                Signed in as: <a>{currentUser.email}</a>
                            </Navbar.Text>
                        </Navbar.Brand>

                        <Button onClick={handleLogout} variant='dark'>
                            Log out 
                        </Button>
                    </Container>
                </Navbar>
            
            <Row className='mt-5'>
                <Col sm={7}>
                    <ListGroup as='ol' >

                        {notes.map((item, i) => (
                            <ListGroup.Item className='allign-items-center justify-content-center'> 
                                <div   key={i}>
                                    <Button variant='outline-danger' onClick={() => handleDeleteNote(item.id)}>
                                        Usuń notatkę
                                    </Button>
                                    {" "+item.content}
                                    
                                </div>

                            </ListGroup.Item>
                        ))}
                    
                    </ListGroup>
                </Col>
                <Col sm={5}>
                    <Form className='mt-5'>
                    {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group>
                            <h3 className='mb-3'> Tu możesz napisać notatkę </h3>
                            <Form.Control type='text' value={noteContent} onChange={evt => setNoteContent(evt.target.value)}></Form.Control>
                            <Form.Text className="text-muted">
                                Proszę nie pisać nic brzydkiego
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Button onClick={handleAddNote} className="mt-3">
                            Dodaj notatkę
                            </Button>
                        </Form.Group>
                    </Form>
                
                </Col>
            </Row>
        </>
    )
}
