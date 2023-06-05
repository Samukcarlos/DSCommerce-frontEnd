import './styles.css';
import ButtonPrimary from "../../components/ButtonInverse";
import ButtonInverse from "../../components/ButtonPrimary";
import HearderClient from "../../components/HeaderClient";
import ProductDetailsCard from "../../components/ProductDetailsCard";

export default function ProductDetails(){
    return (
        <>
    <HearderClient />
     
    <main>
      <section id="product-details-section" className="dsc-container">
        <ProductDetailsCard />
        <div className="dsc-btn-page-container">
            <ButtonPrimary />
            <ButtonInverse />
        </div>
      </section>
    </main>
 
    </>
    );
}

