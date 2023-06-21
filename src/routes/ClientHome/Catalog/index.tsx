import './styles.css'
import SearchBar from '../../../components/SearchBar';
import CatalogCard from '../../../components/CatalogCard';
import ButtonNextPage from '../../../components/ButtonNextPage';
import * as productService from '../../../services/product-service';
import { useEffect, useState } from 'react';
import { ProductDTO } from '../../../models/product';

type QueryParams ={
  page: number;
  name: string;
}

export default function Catalog(){

  const [products, setProduct]= useState<ProductDTO[]>([]);

  const [queryParams, setQueryParams]= useState<QueryParams>({
    page: 0,
    name: ""
  });

  //const [productName, setProductName] = useState("");

  useEffect(()=> {
        productService.findPageRequest(queryParams.page, queryParams.name)
        .then(response => {
            setProduct(response.data.content)
        });
  }, [queryParams]); // mudando o status/valor a função é executada (productService)

  function handleSearch(searchText: string){
    setQueryParams({...queryParams, name: searchText});
  }

    return (      
        <main>
        <section id="catalog-section" className="dsc-container">
        <SearchBar onSearch={handleSearch} />
  
          <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
              {
                products.map(product => <CatalogCard key={product.id} product={product} /> )
              }
             
          </div>
          <ButtonNextPage />
          
        </section>
      </main>
     
    );
}