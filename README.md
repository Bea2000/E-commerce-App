# COMO CORRER LA APLICACIÓN

## Requisitos
- Tener instalado Docker para poder correr contenedores

### Guía para Linux
1. Setear docker `apt` repository
```bash
    # Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

2. Instalar paquetes de docker
```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

3. Comprobar que docker está instalado
```bash
sudo service docker start
sudo docker run hello-world
```

4. Recomiendo descargar la aplicacón [Docker Desktop](https://www.docker.com/products/docker-desktop/)

5. Linkear con WSL2 en settings de Docker Desktop

## Correr la aplicación

Simplemente ejecutar el comando
```bash
docker compose up
```
y esperar a que se descarguen las imágenes y se levanten los contenedores.

# Supuestos Realizados
1. El botón de `Generar Carrito` genera un carro de largo aleatorio con productos aleatorios. El largo va desde 1 hasta la cantidad de productos totales.
2. El botón de `Finalizar Compra` solo aparece si se generó un carro aleatorio de compras.
3. Decidí agregar los detalles de **nombre**, **precio** y **descripción** para cada producto en el carro.
4. Setee una cantidad de **1** para todos los productos en el carro con posibilidad de que el usuario pudiera modificarlo.
5. Entendí que el botón de `Cotizar Despacho` hace un llamado a la función del **backend** y retorna un mensaje de éxito o error según el *real stock*.
6. Todos los valores fueron obtenidos de la api `https://dummyjson.com/products`

Espero les guste la aplicación y cualquier duda o sugerencia, no duden en contactarme. ✨😀# nomad-ecommerce
