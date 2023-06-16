import './styles.css';
import ButtonPrimary from "../../../components/ButtonInverse";
import ButtonInverse from "../../../components/ButtonPrimary";
import ProductDetailsCard from "../../../components/ProductDetailsCard";
import * as productService from '../../../services/product-service';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductDTO } from '../../../models/product';

export default function ProductDetails(){

  const params = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDTO>();

  useEffect(() => {
    productService.findById(Number(params.productId))
      .then(response => {
          setProduct(response.data);
      })
      .catch(() => {
          navigate("/");
      });
   }, []);   
  return (            
    <main>
      <section id="product-details-section" className="dsc-container">
        {
            product &&
            <ProductDetailsCard product={product} />
           // ? <ProductDetailsCard product={product} />
           // : <h2>Código inválido</h2>
        }
        
        <div className="dsc-btn-page-container">
            <ButtonPrimary text='Comprar' />
            <Link to="/">
            <ButtonInverse text='Início' />
            </Link>
        </div>
      </section>
    </main>
 
   
    );
}

