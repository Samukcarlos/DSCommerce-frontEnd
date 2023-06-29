import './styles.css'
import SearchBar from '../../../components/SearchBar';
import CatalogCard from '../../../components/CatalogCard';
import ButtonNextPage from '../../../components/ButtonNextPage';
import * as productService from '../../../services/product-service';
import { useEffect, useState } from 'react';
import { ProductDTO } from '../../../models/product';
import { isAuthenticated } from '../../../services/auth-service';

type QueryParams ={
  page: number;
  name: string;
}

export default function Catalog(){

  const [isLestPage, setIsLestPage]= useState(false);  // é a ultama página? caso seja botão carregar mais some

  const [products, setProduct]= useState<ProductDTO[]>([]);

  const [queryParams, setQueryParams]= useState<QueryParams>({
    page: 0,
    name: ""
  });

  //const [productName, setProductName] = useState("");

  useEffect(()=> {
      console.log("AUTENTICADO", isAuthenticated());
        productService.findPageRequest(queryParams.page, queryParams.name)
        .then(response => {
            const nextPage = response.data.content;
            setProduct(products.concat(nextPage)); //acrescentando itens na página com o carregar mais
            setIsLestPage(response.data.last);
          });
  
  }, [queryParams]); // mudando o status/valor a função é executada (productService)

  function handleSearch(searchText: string){
    setProduct([]);
    setQueryParams({...queryParams,page:0, name: searchText});
  }

  function handleNextPageClick(){
    setQueryParams({...queryParams, page:queryParams.page + 1}); // CARREGAR MAIS
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

              {
                !isLestPage &&
                <div onClick={handleNextPageClick}>
                  <ButtonNextPage />
                </div>
              }
          
        </section>
      </main>
     
    );
}