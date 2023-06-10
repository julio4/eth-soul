import { Web3Storage, File } from 'web3.storage';


const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI2M2NEMzNFODBjNkQyN2QwYkRmNDdmMTdFNmM4NWE1ZjNkMzRjOUMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODYzODA0MzYyNTYsIm5hbWUiOiJldGhwcmFndWVfYXBpX3Rva2VuIn0.V-QWUPiUMuqkgHnsbVwaZbozKXvo5iYQgqrxpdFdzj8';

const storage = new Web3Storage({ token: API_TOKEN });


const makeFilesFromOffer = (offer: Offer, image: File): File[] => {
  // You can create File objects from a Buffer of binary data
  // see: https://nodejs.org/api/buffer.html
  // Here we're just storing a JSON object, but you can store images,
  // audio, or whatever you want!
  const buffer = Buffer.from(JSON.stringify(offer))

  const files = [
    // new File(['contents-of-file-1'], 'plain-utf8.txt'),
    new File([buffer], 'offerData'),
    new File([image], 'offerImg'),
  ]

  return files
}

const storeWithProgress = async (files: File[]) => {
  // show the root cid as soon as it's ready
  const onRootCidReady = (cid: string) => {
    console.log('uploading files with cid:', cid);
  }

  // when each chunk is stored, update the percentage complete and display
  const totalSize = files.map(f => f.size).reduce((a, b) => a + b, 0);
  let uploaded = 0;

  const onStoredChunk = (size: number) => {
    uploaded += size;
    const pct = 100 * (uploaded / totalSize);
    console.log(`Uploading... ${Math.trunc(pct)}% complete`);
  }

  // storage.put will invoke our callbacks during the upload
  // and return the root cid when the upload completes
  return await storage.put(files, { onRootCidReady, onStoredChunk });
}

export const storeOffer = async (image: File) => {
  const offerToStore: Offer = {
    coordinates: {
      longitude: 14.4378005,
      latitude: 50.0755381
    },
    title: 'Babysitting',
    description: 'Babysit my child between 6pm and 8pm',
    category: 'cat',
    pseudo: 'myPseudo',
    imageLink: ''
  }
  const filesToUpload = makeFilesFromOffer(offerToStore, image);

  return await storeWithProgress(filesToUpload);
}

export const retrieveOffer = async (cid: string) => {
  const offer: Offer = await fetch(`https:/${cid}.ipfs.w3s.link/offerData`)
  .then((res) => res.json())
  .then((res) => res);

  offer.imageLink = `https:/${cid}.ipfs.w3s.link/offerImg`;

  console.log(offer);

  return offer;
}

export const retrieveOffers = async (cids: string[]) => {
  const offers: Offer[] = [];

  for (const cid of cids) {
    const offer = await retrieveOffer(cid);
    offers.push(offer);
  }

  return offers;
}

