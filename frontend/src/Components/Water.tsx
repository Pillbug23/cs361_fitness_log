import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Chart } from 'react-google-charts'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import ProgressBar from 'react-bootstrap/ProgressBar'

import { IoWater } from 'react-icons/io5'
import { MdAirlineSeatLegroomExtra } from 'react-icons/md'

// ── Type definitions ──
interface WaterEntry {
  cup: number
}

interface WaterFormData {
  cup: string
}

function Water() {
  // ── State ──
  const [data, setData] = useState<WaterEntry[]>([])
  const [amount, setAmount] = useState<number>(0)
  const [formData, setFormData] = useState<WaterFormData>({ cup: '' })

  // ── Fetch all water entries ──
  const fetchData = async (): Promise<any> => {
    try {
      const response = await fetch('http://localhost:9825/water')
      if (response.ok) {
        const data_water: WaterEntry[] = await response.json()
        setData(data_water)
      } else {
        console.error('Error fetching data:', response.status)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // ── Effects ──
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    calculateCups(data)
  }, [data])

  // ── Calculate total cups ──
  const calculateCups = (data: WaterEntry[]): void => {
    if (data.length === 0) return
    const total = data.reduce((sum: number, item: WaterEntry) => sum + item.cup, 0)
    setAmount(total)
  }

  // ── Handlers ──
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:9825/water', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        setFormData({ cup: '' })
        fetchData()
      }
    } catch (error) {
      console.error('Could not add entry', error)
    }
  }

  const handleDelete = () => {
    fetch('http://localhost:9825/delete-water', { method: 'DELETE' })
      .then((response) => {
        if (response.ok) {
          setAmount(0)
        }
      })
  }

  // ── Render ──
  return (
    <section>
      <Container fluid className="basic-info" id="signup">
        <Container className="content">

          {/* Progress bar + alert */}
          <Row style={{ marginBottom: '30px' }}>
            <Col>
              {amount >= 16 && (
                <Alert key="success" variant="success">
                  Congrats! You've met your water intake quota for today!
                </Alert>
              )}
              <h1><IoWater /> Water Intake Progress Bar</h1>
              <p>
                It's recommended to drink around 15.5 cups of water per day.
                Here you can update the amount of cups you've drank throughout
                the day and submit the cups you drank to update the progress
                bar. When you've drank 16 cups, the progress bar is complete and
                will display a completion message!
              </p>
              <ProgressBar animated style={{ height: '100px' }} now={amount} max={16} />
            </Col>
          </Row>

          {/* Form */}
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Cups Intaked (Amount of Cups of Water Consumed)</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.cup}
                    name="cup"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" style={{ marginBottom: '20px' }}>
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>

          {/* Reset button */}
          <Row>
            <Col>
              <Button variant="danger" onClick={handleDelete}>
                Reset Water Daily Intake
              </Button>
            </Col>
          </Row>

        </Container>
      </Container>
    </section>
  )
}

export default Water