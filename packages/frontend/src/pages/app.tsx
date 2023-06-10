/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { useState, useCallback, useLayoutEffect, useRef, useEffect } from 'react'
import { TopBar } from '@components/top/TopBar'
import MarkedMap from '@components/map'
import type { NextPage } from 'next'
import { Offer, Author, RawOffer, PopulatedOffer } from '../types/app'
import { Category, CategoryDetails } from '../types/category'
import { motion } from 'framer-motion'
import { generateAuthor } from '../utils/randomAuthor'
import toast from 'react-hot-toast'

import { IoClose } from 'react-icons/io5'

import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Icon,
  Textarea,
  Select,
  Grid,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spacer,
} from '@chakra-ui/react'

import 'twin.macro'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import Web3 from 'web3'
import { retrieveOffer, storeOffer } from '@service/web3storage'
import { THE_GRAPH_URL } from '@utils/const'

const OffersQuery = `query ($first: Int)
{
  offers(where: { isActive: true }, first: $first) {
    id
    offerId
    offerer
    isActive
    hash
    tokens
  }
}`

const CreateModeModal = ({
  createMode, setCreateMode, targetPos, setTargetPos,
  title,
  setTitle,
  description,
  setDescription,
  category,
  setCategory,
  price,
  setPrice,
  confirm,
  file,
  setFile,
}: {
  createMode: boolean,
  setCreateMode: (createMode: boolean) => void,
  targetPos: google.maps.LatLng | null,
  setTargetPos: (targetPos: google.maps.LatLng | null) => void,
  title: string,
  setTitle: (title: string) => void,
  description: string,
  setDescription: (description: string) => void,
  category: Category,
  setCategory: (category: Category) => void,
  price: number,
  setPrice: (price: number) => void,
  confirm: () => void,
  file: File | null,
  setFile: (file: File | null) => void,
}) => {
  const onToggleCreateMode = useCallback(() => {
    if (!createMode) {
      setTargetPos(null)
      toast.success('Click on the map to create a new offer')
    }
    setCreateMode(!createMode)
  }, [setTargetPos, setCreateMode, createMode])

  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<string | number>('auto')
  const [width, setWidth] = useState<string | number>('auto')

  const isFormOpen = createMode && targetPos

  useLayoutEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setHeight(containerRef.current.offsetHeight)
        setWidth(containerRef.current.offsetWidth)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isFormOpen])

  useEffect(() => {
    if (isFormOpen) {
      setHeight('auto')
      setWidth('auto')
    }
  }, [isFormOpen])

  return (
    <Box>
      <motion.div
        ref={containerRef}
        tw="absolute right-0 m-8 p-5 rounded-2xl text-3xl bg-white/70 backdrop-blur-md shadow-xl"
        transition={{ duration: 0.2 }}
        animate={{ height, width }}
        {...(!isFormOpen && {
          whileHover: { scale: 1.1 },
          whileTap: { scale: 0.9 },
        })}
      >
        {!isFormOpen ? (
          <button
            onClick={onToggleCreateMode}
          >
            {createMode ? '✖️' : '🆕'}
          </button>
        ) : (
          <div
          >
            <FormControl>
              <Flex>
                <Spacer />
                <Button
                  onClick={onToggleCreateMode}
                  variant="ghost"
                  size="sm"
                  aria-label="Close form"
                >
                  <Icon as={IoClose} />
                </Button>
              </Flex>

              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <Box>
                  <FormLabel>Title</FormLabel>
                  <Input type='text' value={title} onChange={(event) => {
                    setTitle(event.target.value)
                  }} />

                  <FormLabel>Price</FormLabel>
                  <NumberInput step={10} defaultValue={100} min={1} value={price} onChange={(event) => {
                    setPrice(parseInt(event))
                  }}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>

                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={description}
                    onChange={(event) => {
                      setDescription(event.target.value)
                    }}
                    maxBlockSize={200}
                  />
                </Box>

                <Box>
                  <FormLabel>Category</FormLabel>
                  <Select onChange={(event) => {
                    setCategory(event.target.value as Category)
                  }} value={
                    category
                  }>
                    {
                      Object
                        .values(Category)
                        .map((category) => {
                          const details = CategoryDetails[category]
                          return (
                            <option key={category} value={category}>
                              {details.emoji} {details.description}
                            </option>
                          )
                        })
                    }
                  </Select>
                  <FormLabel htmlFor="images">Images</FormLabel>
                  <Input type='file'/>
                  <Button
                    colorScheme="green"
                    position="fixed"
                    bottom="4"
                    right="4"
                    width={"46%"}
                    onClick={confirm}
                  >
                    Confirm
                  </Button>

                </Box>
              </Grid>
            </FormControl>
          </div>
        )}
      </motion.div >
    </Box >
  )
}

const AppPage: NextPage = () => {

  const client = new ApolloClient({
    uri: THE_GRAPH_URL,
    cache: new InMemoryCache()
  });

  const [rawOffers, setRawOffers] = useState<RawOffer[]>([]);
  const [markers, setMarkers] = useState<Offer[]>([]);

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [category, setCategory] = useState<Category>(Category.EDUCATION_TUTORING)
  const [price, setPrice] = useState<number>(0)
  const [file, setFile] = useState<File | null>(null)

  const confirm = async () => {
    console.log("title", title, "description", description, "category", category, "price", price, "targetPos", targetPos)
    // const cid = await storeOffer({
    //   coordinates: {
    //     latitude: targetPos?.lat() as number,
    //     longitude: targetPos?.lng() as number
    //   },
    //   title,
    //   description,
    //   category: JSON.stringify(category),
    //   pseudo: 'pseudo',
    //   imageLink: 'imageLink'
    // },
    // )

    // const hash1 = Web3.utils.asciiToHex(cid.slice(0, 32))
    // const hash2_pre = Web3.utils.asciiToHex(cid.slice(32, 64))
    // const hash2 = "0x" + hash2_pre.slice(2, 64).padStart(122 - hash2_pre.length - 2, "0")

    // console.log("hash1", hash1, "hash2", hash2)

    // ... Continue ...
  }

  const queryOffers = async () => {
    await client
      .query({
        query: gql(OffersQuery),
        variables: {
          first: 20
        }
      })
      .then((data) => {
        setRawOffers(data.data.offers)
      })
      .catch((err) => {
        console.log('Error fetching data: ', err)
      })
  }

  const mapRawOfferToOffer = async (rawOffer: RawOffer) => {
    const { id, offerId, offerer, isActive, hash, tokens } = rawOffer
    const cid1 = Web3.utils.hexToAscii(hash[0])
    const cid2 = Web3.utils.hexToAscii(hash[1]).slice(5)
    const cid = cid1 + cid2;

    try {
      const data = await retrieveOffer(cid)
      const offer: PopulatedOffer = {
        id: Number(id),
        offerer,
        isActive,
        location: data.coordinates,
        price: tokens,
        title: data.title,
        description: data.description,
        // @ts-ignore 
        category: Category[data.category],
        images: [data.imageLink],
        author: generateAuthor(),
      }
      return offer;
    }
    catch (err) {
      console.log("IPFS error, cid: ", cid)
    }
  }

  useEffect(() => {
    queryOffers()
  }, [])


  useEffect(() => {
    async function setOffers(offers: RawOffer[]) {
      const populatedOffers = await Promise.all(offers.map(mapRawOfferToOffer))
      const filteredOffers = populatedOffers.filter((offer) => offer) as Offer[]
      setMarkers(filteredOffers)
    }
    if (rawOffers && rawOffers.length > 0) {
      setOffers(rawOffers)
    }
  }, [rawOffers])

  useEffect(() => {
    console.log(markers)
  }, [markers])


  // const markers: Offer[] = [
  //   {
  //     id: 1,
  //     price: 1000,
  //     location: {
  //       latitude: 50.102425406026136,
  //       longitude: 14.449577761673018,
  //     },
  //     images: [
  //       "https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nJTIwbG92ZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  //       "https://images.unsplash.com/photo-1530700131180-d43d9b8cc41f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=834&q=80",
  //       "https://images.unsplash.com/photo-1511657304136-7d9f56e0d574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80",
  //     ],
  //     category: Category.PET_CARE,
  //     author: generateAuthor(),
  //     title: 'Dog walking',
  //     description: "Calling all dog lovers! <br/> Need someone to give your furry friend some exercise? Look no further! I'm a fitness enthusiast who adores dogs and is ready to take your pup on exciting walks. With me, your canine companion will get the exercise and attention they need. Let's keep those tails wagging!",
  //   },
  //   {
  //     id: 2,
  //     price: 100,
  //     location: {
  //       latitude: 50.106576158326526,
  //       longitude: 14.4458621243181541
  //     },
  //     category: Category.LENDING_HOME_SERVICES,
  //     author: generateAuthor(),
  //     title: "Handy Tools for Borrow!",
  //     description: "DIY enthusiasts, I've got you covered! <br/> I'm a handy neighbor with a collection of tools ready to lend a helping hand. From hammers to drills, you can borrow the tools you need for your home projects. No need to invest in expensive equipment—simply borrow and get the job done. Let's tackle those DIY dreams together!",
  //   },
  //   {
  //     id: 3,
  //     price: 500,
  //     location: {
  //       latitude: 50.107593822962535,
  //       longitude: 14.453795834816791
  //     },
  //     category: Category.EDUCATION_TUTORING,
  //     author: generateAuthor(),
  //     title: "Tutoring Services for Academic Success!",
  //     description: "Struggling with your studies? Don't worry, I'm here to help! <br/> As an experienced and dedicated tutor, I offer personalized tutoring services to help you excel in your academic pursuits. From math and science to language arts, I'll provide the guidance and support you need to achieve your goals. Let's unlock your full potential and achieve academic success together!"
  //   },
  //   {
  //     id: 4,
  //     price: 100,
  //     location: {
  //       latitude: 50.101831,
  //       longitude: 14.451390
  //     },
  //     category: Category.REPAIR_MAINTENANCE,
  //     author: generateAuthor(),
  //     title: "Bike Repair Services",
  //     description: "Need a tune-up? <br/> I'm a bike enthusiast with a passion for cycling and a knack for repairs. Whether you need a quick fix or a full tune-up, I'll get your bike back on the road in no time. Let's get you back in the saddle!",
  //   },
  //   {
  //     id: 5,
  //     price: 100,
  //     location: {
  //       latitude: 50.102831,
  //       longitude: 14.451390
  //     },
  //     category: Category.TRANSPORT_SERVICES,
  //     author: generateAuthor(),
  //     title: "Transport Services",
  //     description: "Need a ride? <br/> I'm a driver with a passion for helping others. Whether you need a ride to the airport or a lift to the grocery store, I'll get you where you need to go. Let's get you moving!",
  //   },
  //   {
  //     id: 6,
  //     price: 100,
  //     location: {
  //       latitude: 50.103831,
  //       longitude: 14.444390
  //     },
  //     category: Category.TRANSPORT_SERVICES,
  //     author: generateAuthor(),
  //     title: "Carpool Services",
  //     description: "Carpooling made easy! <br/> Let's save money and reduce our carbon footprint by sharing rides. I'm a good driver with a reliable car and a passion for helping others!",
  //   },
  //   {
  //     id: 7,
  //     price: 100,
  //     location: {
  //       latitude: 50.109831,
  //       longitude: 14.442390
  //     },
  //     category: Category.REPAIR_MAINTENANCE,
  //     author: generateAuthor(),
  //     title: "DIY Plumbing Services",
  //     description: "Need a hand? <br/> I'm a handy neighbor with a knack for plumbing. Whether you need a quick fix or a full repair, I'll get your pipes flowing in no time. Let's get you back to business!",
  //   },
  //   {
  //     id: 8,
  //     price: 100,
  //     location: {
  //       latitude: 50.106831,
  //       longitude: 14.449390
  //     },
  //     category: Category.TECHNOLOGY,
  //     author: generateAuthor(),
  //     title: "Computer Repair Services",
  //     description: "Computer problems? <br/> I'm a tech enthusiast with a passion for helping others. Whether you need a quick fix or a full repair, I'll get your computer back up and running in no time. Let's get you back to business!",
  //   },
  //   {
  //     id: 9,
  //     price: 100,
  //     location: {
  //       latitude: 50.107831,
  //       longitude: 14.439390
  //     },
  //     category: Category.EVENTS_CONSULTING,
  //     author: generateAuthor(),
  //     title: "Event Planning Services",
  //     description: "Planning an event? <br/> I'm an experienced event planner with a passion for helping others. Whether you need a hand with the details or a full-service planner, I'll make sure your event is a success. Let's get planning!",
  //   },
  // ];

  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 50.10340217817493,
    lng: 14.450536191137255
  });
  const [zoom, setZoom] = useState<number>(15);
  const [highlightedMarker, setHighlightedMarker] = useState<Offer | null>(null);
  const [createMode, setCreateMode] = useState<boolean>(false);
  const [targetPos, setTargetPos] = useState<google.maps.LatLng | null>(null);

  const onMarkerClick = useCallback(
    (payload: Offer) => {
      if (highlightedMarker?.id === payload.id) {
        setHighlightedMarker(null);
      } else {
        setHighlightedMarker(payload);
      }
    },
    [highlightedMarker]
  );


  const onMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng === null) return;
      console.log("Map clicked to ", event.latLng.toString());
      setTargetPos(event.latLng);
    },
    [setTargetPos]
  );

  return (
    <>
      <TopBar />
      <MarkedMap
        zoom={zoom}
        center={center}
        markers={markers}
        onMarkerClick={onMarkerClick}
        onClick={onMapClick}
        highlightedMarker={highlightedMarker}
        clickable={createMode}
        targetPos={targetPos}
        setTargetPos={setTargetPos}
      />
      <CreateModeModal
        createMode={createMode} setCreateMode={setCreateMode}
        targetPos={targetPos} setTargetPos={setTargetPos}
        title={title} setTitle={setTitle}
        description={description} setDescription={setDescription}
        category={category} setCategory={setCategory}
        price={price} setPrice={setPrice}
        confirm={confirm}
        file={file} setFile={setFile}
      />
    </>
  )
}

export default AppPage
