import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./App.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PersonData {
  name: string;
  age: number;
  height: number;
  weight: number;
  occupation: string;
  hobbies: string;
}

function App() {
  const [personData, setPersonData] = useState<PersonData>({
    name: "",
    age: 0,
    height: 0,
    weight: 0,
    occupation: "",
    hobbies: "",
  });
  const [showChart, setShowChart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonData((prev) => ({
      ...prev,
      [name]:
        name === "age" || name === "height" || name === "weight"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingStep(0);

    // Cycle through loading steps
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= 2) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    // Complete analysis after 6 seconds
    setTimeout(() => {
      clearInterval(stepInterval);
      setIsLoading(false);
      setShowChart(true);
    }, 6000);
  };

  const generateWorthData = () => {
    const currentYear = new Date().getFullYear();
    const age = personData.age || 25; // Default to 25 if no age given
    const birthYear = currentYear - age;
    const years = [];
    const worthValues = [];

    // Generate data from birth year to current year
    for (let year = birthYear; year <= currentYear; year++) {
      years.push(year);
      worthValues.push(100); // Maximum worth (100%) for every year
    }

    return {
      labels: years,
      datasets: [
        {
          label: `IHVI Score for ${personData.name || "You"}`,
          data: worthValues,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          tension: 0.1,
          pointBackgroundColor: "rgb(75, 192, 192)",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 6,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: [
          `Intrinsic Human Value Index (IHVI)`,
          `Analysis for ${personData.name || "You"}`,
        ],
        font: {
          size: window.innerWidth <= 768 ? 14 : 18,
          weight: "bold" as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
        title: {
          display: true,
          text: "IHVI Score (0-100)",
        },
        ticks: {
          stepSize: 20,
        },
      },
      x: {
        title: {
          display: true,
          text: "Year",
        },
        ticks: {
          maxTicksLimit: 10,
        },
      },
    },
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>What am I Worth?</h1>
        <p className="subtitle">
          Advanced Human Value Assessment using Multi-Dimensional Worth Analysis
        </p>
      </header>

      <main className="App-main">
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-content">
              <div className="loading-spinner"></div>
              <h3>Processing Multi-Dimensional Worth Analysis...</h3>
              {loadingStep === 0 && (
                <>
                  <p>🔍 Scanning deep web databases and social networks...</p>
                  <p>📊 Analyzing 2.3+ billion behavioral data points</p>
                  <p>🤖 Deploying neural network algorithms</p>
                </>
              )}
              {loadingStep === 1 && (
                <>
                  <p>🧠 Processing consciousness complexity patterns...</p>
                  <p>💭 Evaluating existential value indicators</p>
                  <p>🌟 Measuring intrinsic dignity factors</p>
                </>
              )}
              {loadingStep === 2 && (
                <>
                  <p>⚡ Cross-referencing multi-dimensional data...</p>
                  <p>📈 Calculating Intrinsic Human Value Index (IHVI)</p>
                  <p>✅ Finalizing comprehensive worth assessment</p>
                </>
              )}
            </div>
          </div>
        ) : !showChart ? (
          <div className="form-container">
            <h2>Multi-Dimensional Worth Assessment Parameters</h2>
            <div className="introduction">
              <h3>How the Assessment Works</h3>
              <p>
                Our advanced AI system will analyze your Intrinsic Human Value
                Index (IHVI) by searching through billions of data points across
                the web, social networks, and behavioral databases. The
                assessment evaluates your worth through multi-dimensional
                analysis including consciousness complexity, existential value,
                and intrinsic dignity factors.
              </p>
              <p>
                The result will show your IHVI score throughout your entire
                life, revealing the true measure of your inherent human worth.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="worth-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={personData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="age">Age:</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={personData.age || ""}
                  onChange={handleInputChange}
                  min="1"
                  max="120"
                />
              </div>

              <div className="form-group">
                <label htmlFor="height">Height (inches):</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={personData.height || ""}
                  onChange={handleInputChange}
                  min="20"
                  max="100"
                  placeholder="e.g., 70 for 5'10&quot;"
                />
              </div>

              <div className="form-group">
                <label htmlFor="weight">Weight (lbs):</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={personData.weight || ""}
                  onChange={handleInputChange}
                  min="50"
                  max="600"
                  placeholder="e.g., 150"
                />
              </div>

              <div className="form-group">
                <label htmlFor="occupation">Occupation:</label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={personData.occupation}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="hobbies">Hobbies/Interests:</label>
                <input
                  type="text"
                  id="hobbies"
                  name="hobbies"
                  value={personData.hobbies}
                  onChange={handleInputChange}
                />
              </div>

              <div className="disclaimer">
                <p>
                  <strong>Privacy Notice:</strong> None of the fields above are
                  required. Your data is not saved, stored, or sold for any
                  purpose. This analysis is performed locally and no information
                  leaves your device.
                </p>
              </div>

              <button type="submit" className="submit-btn">
                Initiate Worth Assessment
              </button>
            </form>
          </div>
        ) : (
          <div className="chart-container">
            <div className="current-score">
              <h3>Current IHVI Score</h3>
              <div className="score-value">100</div>
              <p>Maximum Intrinsic Human Value Index</p>
            </div>
            <div className="chart-wrapper">
              <Line data={generateWorthData()} options={chartOptions} />
            </div>
            <div className="message">
              <h3>Multi-Dimensional Worth Analysis Complete</h3>
              <p>
                Our advanced AI-powered algorithm has completed a comprehensive
                analysis of your Intrinsic Human Value Index (IHVI) across your
                entire lifespan. The system deployed neural networks to search
                through 2.3+ billion data points across deep web databases,
                social networks, and behavioral analytics platforms.
              </p>
              <p>
                The IHVI is a proprietary metric that measures inherent human
                worth through multi-dimensional analysis, including existential
                value, consciousness complexity, intrinsic dignity factors, and
                cross-referenced behavioral patterns. Our AI processed biometric
                data, social interactions, and psychological indicators to
                generate this comprehensive assessment. Results indicate a
                consistent maximum IHVI score, confirming universal human worth
                regardless of external factors.
              </p>
              <button onClick={() => setShowChart(false)} className="back-btn">
                Conduct New Assessment
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
