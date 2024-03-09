import { BiSolidCircle } from 'react-icons/bi'
import './Footer.css'
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa6'

export default function Footer() {
  return (
    <div className='Footer'>
      <footer className='border-top pt-4'>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div>
                <a href="#" className="navbar-brand">
                  <BiSolidCircle size={23} color='red' />
                  <BiSolidCircle size={23} color='orange' style={{ marginLeft: '-12px', opacity: '0.7' }} />
                  <span className='pt-5' style={{ fontWeight: '500', fontFamily: 'monospace', fontSize: '1rem' }}>BizCard</span>
                </a>
                <p className="mb-30 footer-desc pt-2">
                  We know it's tough, BizCard is a company dedicated to helping small business owners just like you connect with the right clients.
                </p>
                <p>
                  Copyright &copy; BizCard, 2024 All rights reserved.
                </p>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6">
              <div>
                <h4>Services</h4>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="text-decoration-none">Marketing</a>
                  </li>
                  <li>
                    <a href="#" className="text-decoration-none">Branding</a>
                  </li>
                  <li>
                    <a href="#" className="text-decoration-none">Web Design</a>
                  </li>
                  <li>
                    <a href="#" className="text-decoration-none">Graphics Design</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6">
              <div>
                <h4>Social Media</h4>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="text-decoration-none">
                      <span><FaTwitter size={15} className='SocialMediaIcon'/>&nbsp;</span>
                      Tweet us a tweet
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-decoration-none">
                      <span><FaFacebook size={15} className='SocialMediaIcon'/>&nbsp;</span>
                      Visit our page
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-decoration-none">
                      <span><FaInstagram size={15} className='SocialMediaIcon'/>&nbsp;</span>
                      It's getting reel
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-decoration-none">
                      <span><FaLinkedinIn size={15} className='SocialMediaIcon'/>&nbsp;</span>
                      We should link !
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-8 mx-auto">
              <div>
                <h4>Newsletter</h4>
                <div>
                  <label htmlFor="Newsletter" className="form-label">Subscribe To Our Newsletter</label>
                  <div className='d-flex'>
                    <input type="text" className="form-control form-control-sm me-2" placeholder="Enter Your Email" />
                    <button className="btn btn-sm btn-danger">Subscribe</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
