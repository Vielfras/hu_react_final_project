import './About.css';

export default function About() {
  return (
    <div className='About Page'>
      <div className="container-fluid py-5">
        <h2>About This Application</h2>
        <p>This application is a web platform designed for businesses to publish and manage their services online. Our goal is to make it easy for users to find and interact with businesses that suit their needs. Through our user-friendly interface, businesses can create, edit, and delete their content, which is then accessible to users across different parts of the site.</p>

        <br />
        <h3>How It Works?</h3>
        
        <h5>Businesses:</h5>
        <p>After registering, you can start by creating your business card. This allows users to learn more about what you offer.</p>
        
        <h5><strong>Users:</strong></h5>
        <p>Browse through various business cards and services. Use our search functionality to find exactly what you need.</p>
        
        <h5><strong>Interactions:</strong></h5>
        <p>Save your favorite services for easy access later, and contact businesses directly through their profiles.</p>

        <br />
        <h5>Thank you for choosing our platform to connect and grow your business. We're here to help you reach more customers and make meaningful connections.</h5>
      </div>
    </div>
  );
}
