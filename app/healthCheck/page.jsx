const fetchStatus = async ()=>{
    const response = await fetch(`${API_URL}/healthCheck`)
    const data= response.json()
    return data
    }
    const HealthCheck= async() => {
        const data = await fetchStatus()
      return (
        <div>
            {data}
        </div>
      )
    }
    
    export default HealthCheck