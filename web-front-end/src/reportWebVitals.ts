import {Metric, onCLS, onINP, onLCP} from 'web-vitals';

function sendToAnalytics(metric: Metric) {
  console.log(metric); // TODO: Send to our analytics
}

const reportWebVitals = () => {
  onCLS(sendToAnalytics); 
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
};

export default reportWebVitals;
