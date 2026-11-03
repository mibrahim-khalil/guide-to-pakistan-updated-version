import axios from 'axios';
import { ApiResponse } from '../../utils/ApiResponse.js';

// Reads Python Scraper URL from environment or defaults to http://localhost:8000
const PYTHON_SCRAPER_URL = process.env.SCRAPER_URL || 'http://localhost:8000';

export const getRouteInfo = async (req, res, next) => {
  try {
    const { origin, destination, message, query_type } = req.body;

    // Send request to Python Scraper Service (Port 8000)
    const response = await axios.post(`${PYTHON_SCRAPER_URL}/api/v1/route/info`, {
      origin,
      destination,
      message,
      query_type: query_type || 'all',
    }, {
      timeout: 15000 // 15 second timeout
    });

    const scraperData = response.data?.data || response.data;

    return res.status(200).json(
      new ApiResponse(200, scraperData, 'Route information fetched successfully')
    );
  } catch (error) {
    console.error('Error contacting Route Scraper service:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch live route updates from Scraper service.',
      error: error.message,
    });
  }
};