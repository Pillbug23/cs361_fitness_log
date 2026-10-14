import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Chart } from 'react-google-charts'
import Slider from '@mui/material/Slider'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

// ── Type definitions ──
interface WeightFormData {
  date: string
  weight: string
}

interface PastWeight {
  Weight: number
}

interface PastWeightAvg {
  averageWeight: number
}

interface ChartDataRow {
  0: string  // date
  1: number  // weight
}

type ChartData = [string, string] | ChartDataRow

interface SliderMark {
  value: number
  label: string
}

function Weight() {
  // ── State ──
  const [data2, setData2] = useState<ChartData[]>([['Date', 'Weight']])
  const [goal, setGoal] = useState<boolean>(false)
  const [pastWeight, setPastWeight] = useState<PastWeight[]>([])
  const [pastWeightAvg, setPastWeightAvg] = useState<PastWeightAvg[]>([])
  const [formData, setFormData] = useState<WeightFormData>({ date: '', weight: '' })
  const [previousFormData, setPreviousFormData] = useState<WeightFormData | null>(null)
  const [sliderValue, setSliderValue] = useState<number>(250)

  // ── Slider marks ──
  const marks: SliderMark[] = [
    { value: 1,   label: '1lb'   },
    { value: 100, label: '100lb' },
    { value: 200, label: '200lb' },
    { value: 300, label: '300lb' },
    { value: 400, label: '400lb' },
    { value: 500, label: '500lb' },
  ]

  // ── Chart options ──
  const options = {
    title: 'Weight',
    curveType: 'function',
    legend: { position: 'bottom' },
  }

  // ── Fetch helpers ──
  const formatAndSort = (data: any[]): ChartDataRow[] => {
    const formatted: ChartDataRow[] = data.map(obj => [
      obj.date.slice(0, 10),
      Number(obj.weight)
    ])
    formatted.sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    return formatted
  }

  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:9825/weight')
      if (response.ok) {
        const data = await response.json()
        const formattedDate = formatAndSort(data)
        setData2(prevData => [...prevData, ...formattedDate.slice(-1)])
      } else {
        console.error('Error fetching data:', response.status)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fetchWeight = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:9825/past-weight')
      if (response.ok) {
        const data = await response.json()
        setPastWeight(data)
      } else {
        console.error('Error fetching data:', response.status)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fetchWeightAvg = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:9825/past-weight-avg')
      if (response.ok) {
        const data = await response.json()
        setPastWeightAvg(data)
      } else {
        console.error('Error fetching data:', response.status)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // ── Effects ──
  useEffect(() => { fetchData() }, [])
  useEffect(() => { fetchWeight() }, [])
  useEffect(() => { fetchWeightAvg() }, [])

  // ── Handlers ──
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSliderChange = (_event: Event, newValue: number | number[]): void => {
    setSliderValue(newValue as number)
  }

  const handleUndo = (): void => {
    if (previousFormData) {
      setFormData(previousFormData)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (formData.weight === String(sliderValue)) {
      setGoal(!goal)
    }
    try {
      const response = await fetch('http://localhost:9825/weight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        setPreviousFormData(formData)
        setFormData({ date: '', weight: '' })
        fetchData()
      }
    } catch (error) {
      console.error('Could not add entry', error)
    }
  }

  const handleDelete = (): void => {
    fetch('http://localhost:9825/delete-weights', { method: 'DELETE' })
      .then(response => {
        if (response.ok) fetchData()
      })
  }

  // ── Render ──
  return (
    <section>
      <Container fluid className="basic-info" id="signup">
        <Container className="content">

          {/* Chart + Slider */}
          <Row>
            <Col>
              <Chart
                chartType="LineChart"
                width="100%"
                height="500px"
                legendToggle
                data={data2}
                options={options}
              />
              <Slider
                name="slide"
                valueLabelDisplay="auto"
                aria-label="term slider"
                value={sliderValue}
                defaultValue={250}
                onChange={handleSliderChange}
                min={1}
                max={500}
                marks={marks}
                color="secondary"
              />
              <Button style={{ marginBottom: '10px' }} onClick={handleDelete}>
                Delete All Entries
              </Button>
              <h2>Goal Weight: {sliderValue}</h2>
              {goal && (
                <Alert variant="success">
                  You have successfully hit your goal weight!
                </Alert>
              )}
              <Button onClick={handleUndo}>Redo Entry</Button>
            </Col>
          </Row>

          {/* Form */}
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.date}
                    name="date"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Current Weight</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Current Weight in lbs"
                    value={formData.weight}
                    name="weight"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
              </Form>
            </Col>
          </Row>

          {/* Past 30 days */}
          <Row>
            <h2 style={{ paddingTop: '20px' }}>Weights Entered Within Past 30 Days</h2>
            <ul>
              {pastWeight.map((value: PastWeight, index: number) => (
                <li
                  key={index}
                  style={{
                    color: 'red', width: '33%', float: 'left',
                    textAlign: 'center', listStyleType: 'none',
                    border: '1px dotted black'
                  }}
                >
                  {value.Weight} lbs
                </li>
              ))}
            </ul>
          </Row>

          {/* Average */}
          <Row>
            <h2 style={{ paddingTop: '20px' }}>
              Average of Entered Weights Within Past 30 Days
            </h2>
            {pastWeightAvg.map((value: PastWeightAvg, index: number) => (
              <p
                key={index}
                style={{
                  color: 'red', textAlign: 'center',
                  fontSize: '150%', border: '1px dotted black'
                }}
              >
                {value.averageWeight} lbs
              </p>
            ))}
          </Row>

          {/* Motivational */}
          <Row>
            <h2 style={{ paddingTop: '20px' }}>You Can Do It!</h2>
            {pastWeightAvg.map((value: PastWeightAvg, index: number) => (
              <p
                key={index}
                style={{
                  color: 'red', textAlign: 'center',
                  fontSize: '100%', border: '1px dotted black'
                }}
              >
                Your average weight within the past 30 days has been {value.averageWeight} lbs!
                That is <u>ABSOLUTELY</u> amazing.
                <br /><br />
                No matter how difficult the journey is, keep up the hard work.
                Remember, safe daily calorie deficit and an increase but consistent
                physical activity do work for most.
                <br /><br />
                It will absolutely <em>pay off</em>!
              </p>
            ))}
          </Row>

        </Container>
      </Container>
    </section>
  )
}

export default Weight