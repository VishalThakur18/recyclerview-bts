"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Smartphone,
  Recycle,
  Cpu,
  MemoryStick,
  Zap,
  TrendingDown,
  Code,
  Lightbulb,
  ArrowDown,
  ArrowRight,
  RefreshCw,
  Layers,
  Copy,
  Check,
} from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref)

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return <span ref={ref}>{count}</span>
}

function RecyclerViewDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = [
    "Initial Layout: Creating ViewHolders",
    "Scrolling: View moves off-screen",
    "Recycling: View enters recycle pool",
    "Reusing: Grabbing recycled view",
    "Rebinding: Updating with new data",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">RecyclerView in Action</h3>
        <Badge variant="secondary" className="animate-pulse">
          Step {currentStep + 1}/5
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Screen */}
        <div className="bg-gray-900 rounded-lg p-4 relative overflow-hidden">
          <div className="bg-gray-800 rounded-t-lg p-2 mb-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <motion.div
                key={item}
                className="bg-white rounded p-3 flex items-center space-x-3"
                animate={{
                  y: currentStep === 1 && index === 0 ? -100 : 0,
                  opacity: currentStep === 1 && index === 0 ? 0.5 : 1,
                }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-2 bg-gray-300 rounded mb-1"></div>
                  <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center">
          <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
            <ArrowRight className="w-8 h-8 text-blue-600" />
          </motion.div>
        </div>

        {/* Recycle Pool */}
        <div className="bg-green-50 rounded-lg p-4 border-2 border-dashed border-green-300">
          <div className="flex items-center mb-4">
            <Recycle className="w-5 h-5 text-green-600 mr-2" />
            <h4 className="font-semibold text-green-800">Recycle Pool</h4>
          </div>
          <div className="space-y-2">
            {currentStep >= 2 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded p-2 border border-green-200"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-1 bg-gray-300 rounded mb-1"></div>
                    <div className="h-1 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 font-medium">{steps[currentStep]}</p>
      </div>
    </div>
  )
}

function RestaurantAnalogy() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    { icon: "🍽️", text: "Restaurant has limited plates", color: "bg-orange-100" },
    { icon: "👨‍🍳", text: "Customer finishes eating", color: "bg-blue-100" },
    { icon: "🧽", text: "Plate gets washed (cleared)", color: "bg-green-100" },
    { icon: "🥘", text: "New food added to clean plate", color: "bg-purple-100" },
    { icon: "🚶", text: "Served to new customer", color: "bg-pink-100" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8">
      <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">🍽️ The Restaurant Analogy</h3>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className={`${step.color} rounded-lg p-4 text-center min-w-[150px] ${
              activeStep === index ? "ring-2 ring-orange-400 scale-105" : ""
            }`}
            animate={{
              scale: activeStep === index ? 1.05 : 1,
              opacity: activeStep === index ? 1 : 0.7,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-3xl mb-2">{step.icon}</div>
            <p className="text-sm font-medium text-gray-700">{step.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Badge variant="outline" className="text-orange-700 border-orange-300">
          Step {activeStep + 1}: {steps[activeStep].text}
        </Badge>
      </div>
    </div>
  )
}

function LiveRecyclerViewSimulation() {
  const [visibleViews, setVisibleViews] = useState([
    { id: 1, content: "List Item Content", position: 0 },
    { id: 2, content: "List Item Content", position: 1 },
    { id: 3, content: "List Item Content", position: 2 },
    { id: 4, content: "List Item Content", position: 3 },
  ])

  const [recyclePool, setRecyclePool] = useState([{ id: 6, content: "Ready for reuse" }])

  const [isRecycling, setIsRecycling] = useState(false)
  const [nextItemId, setNextItemId] = useState(7)

  const simulateScroll = () => {
    if (isRecycling) return

    setIsRecycling(true)

    // Move first visible view to recycle pool
    setTimeout(() => {
      const viewToRecycle = visibleViews[0]
      setVisibleViews((prev) => prev.slice(1))
      setRecyclePool((prev) => [...prev, { ...viewToRecycle, content: "Ready for reuse" }])
    }, 500)

    // Add new view from recycle pool or create new one
    setTimeout(() => {
      if (recyclePool.length > 0) {
        const recycledView = recyclePool[0]
        setRecyclePool((prev) => prev.slice(1))
        setVisibleViews((prev) => [
          ...prev,
          {
            id: recycledView.id,
            content: "List Item Content",
            position: prev.length > 0 ? prev[prev.length - 1].position + 1 : 0,
          },
        ])
      } else {
        setVisibleViews((prev) => [
          ...prev,
          {
            id: nextItemId,
            content: "List Item Content",
            position: prev.length > 0 ? prev[prev.length - 1].position + 1 : 0,
          },
        ])
        setNextItemId((prev) => prev + 1)
      }
      setIsRecycling(false)
    }, 1000)
  }

  useEffect(() => {
    const interval = setInterval(simulateScroll, 3000)
    return () => clearInterval(interval)
  }, [visibleViews, recyclePool, isRecycling])

  return (
    <div className="bg-gray-900 rounded-xl p-8 text-white overflow-hidden">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-green-400 mb-4">Live RecyclerView Simulation</h3>
        <p className="text-gray-300 text-lg">Watch how views are recycled in real-time as you scroll</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Visible Views */}
        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-green-400 mb-4">Visible Views</h4>
          <div className="border-2 border-green-500/30 rounded-lg p-4 min-h-[400px] bg-gray-800/50">
            <div className="space-y-3">
              {visibleViews.map((view, index) => (
                <motion.div
                  key={`${view.id}-${view.position}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="border border-gray-600 rounded-lg p-4 bg-gray-700"
                  layout
                >
                  <div className="text-sm text-gray-400 mb-2">View #{view.id}</div>
                  <div className="text-white font-medium">{view.content}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Recycling Process */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-300 mb-4">Recycling Process</div>
            <motion.div
              animate={{ rotate: isRecycling ? 360 : 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="w-16 h-16 mx-auto mb-4"
            >
              <RefreshCw className="w-full h-full text-green-400" />
            </motion.div>
            <motion.div
              animate={{ x: isRecycling ? [0, 20, 0] : 0 }}
              transition={{ duration: 0.5, repeat: isRecycling ? 2 : 0 }}
              className="text-purple-400"
            >
              <ArrowRight className="w-8 h-8 mx-auto" />
            </motion.div>
          </div>
        </div>

        {/* Recycle Pool */}
        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-purple-400 mb-4">Recycle Pool</h4>
          <div className="border-2 border-purple-500/30 rounded-lg p-4 min-h-[400px] bg-gray-800/50">
            <div className="text-center text-gray-400 mb-4">Recycled Views</div>
            <div className="space-y-3">
              {recyclePool.map((view, index) => (
                <motion.div
                  key={`recycled-${view.id}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border border-purple-500/50 rounded-lg p-4 bg-purple-900/20"
                >
                  <div className="text-sm text-purple-300 mb-2">View #{view.id}</div>
                  <div className="text-purple-200 font-medium">({view.content})</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Badge
          variant="outline"
          className={`${isRecycling ? "border-green-400 text-green-400" : "border-gray-500 text-gray-400"} transition-colors`}
        >
          {isRecycling ? "Recycling in progress..." : "Waiting for next scroll..."}
        </Badge>
      </div>
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <button
      onClick={copyToClipboard}
      className="absolute top-4 right-4 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors group"
      title={copied ? "Copied!" : "Copy code"}
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4 text-gray-300 group-hover:text-white" />
      )}
    </button>
  )
}

export default function RecyclerViewBlog() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <motion.div className="absolute inset-0 opacity-10" style={{ y }}>
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-xl" />
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-400 rounded-full blur-xl" />
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-indigo-400 rounded-full blur-xl" />
        </motion.div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2">
              <Code className="w-4 h-4 mr-2" />
              Android Development
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
              Behind The Scene: How does{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  RecyclerView
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>{" "}
              really work? 🤔
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Ever wondered how apps like <span className="font-semibold text-pink-600">Instagram</span>,
              <span className="font-semibold text-red-600"> Gmail</span>, or
              <span className="font-semibold text-black"> TikTok</span> scroll through thousands of items so smoothly
              without crashing your phone? The secret hero is
              <span className="font-bold text-blue-600"> RecyclerView</span>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <Smartphone className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium">Mobile Optimized</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <Zap className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="text-sm font-medium">High Performance</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <MemoryStick className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm font-medium">Memory Efficient</span>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            className="text-blue-600"
          >
            <ArrowDown className="w-8 h-8 mx-auto" />
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 space-y-16">
        {/* Introduction */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Lightbulb className="w-8 h-8 text-yellow-500 mr-3" />
              What is RecyclerView?
            </h2>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  <span className="font-bold text-blue-600">RecyclerView</span> is a powerful and flexible
                  <span className="bg-yellow-100 px-2 py-1 rounded font-semibold mx-1">ViewGroup</span>
                  in Android used for displaying large sets of data that can be scrolled through efficiently. You see it
                  everywhere: your contact list, the feed in Instagram, your emails in Gmail, or product lists in
                  shopping apps.
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-blue-500">
                  <p className="text-gray-700 leading-relaxed">
                    It's the advanced successor to the older{" "}
                    <span className="line-through text-gray-500">ListView</span>. While ListView also had a recycling
                    mechanism, it wasn't as efficient or enforced.
                    <span className="font-bold text-green-600"> RecyclerView improves upon it significantly</span>
                    by enforcing the{" "}
                    <span className="bg-green-100 px-2 py-1 rounded font-semibold">ViewHolder pattern</span>, which
                    drastically minimizes expensive operations and memory usage.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        {/* Restaurant Analogy */}
        <motion.section initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Big Idea: An Analogy</h2>
          <RestaurantAnalogy />

          <Card className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
            <CardContent className="p-6">
              <p className="text-lg text-gray-700 leading-relaxed text-center">
                This is <span className="font-bold text-orange-600">exactly</span> what RecyclerView does. It doesn't
                create a new view (a "plate") for every item in your list. It keeps a
                <span className="bg-orange-100 px-2 py-1 rounded font-semibold mx-1">small pool of views</span>
                and recycles them to display new data as you scroll.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Technical Breakdown */}
        <motion.section initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}>
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <Layers className="w-8 h-8 text-purple-600 mr-3" />
              ⚙️ Behind the Scenes: The Technical Breakdown
            </h2>
          </motion.div>

          <LiveRecyclerViewSimulation />

          <motion.div variants={fadeInUp} className="mt-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {[
                    {
                      step: "1. Initial Layout",
                      description:
                        "When the list is first displayed, RecyclerView creates just enough ViewHolder objects to fill the screen, plus a few extra as a buffer.",
                      highlight: "ViewHolder",
                      color: "blue",
                    },
                    {
                      step: "2. Scrolling Off-Screen",
                      description:
                        "As you scroll and a view moves off the top of the screen, RecyclerView doesn't destroy it. It marks it as 'scrap.'",
                      highlight: "scrap",
                      color: "orange",
                    },
                    {
                      step: "3. Entering the Recycle Pool",
                      description:
                        "This 'scrap' view is placed into a Recycle Pool. Think of this as the 'plate washing station.'",
                      highlight: "Recycle Pool",
                      color: "green",
                    },
                    {
                      step: "4. Rebinding",
                      description:
                        "RecyclerView grabs the recycled view and tells the Adapter via onBindViewHolder(): 'Hey, I have a spare view here. Please bind the data for position 50 to it.'",
                      highlight: "onBindViewHolder()",
                      color: "purple",
                    },
                    {
                      step: "5. Back On-Screen",
                      description:
                        "The recycled, now updated, view is measured, laid out, and drawn at the bottom of the screen, appearing as a completely new item.",
                      highlight: "milliseconds",
                      color: "pink",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-gray-50 to-white border border-gray-100"
                    >
                      <div
                        className={`w-8 h-8 rounded-full bg-${item.color}-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">{item.step}</h4>
                        <p className="text-gray-700 leading-relaxed">
                          {item.description.split(item.highlight).map((part, i, arr) => (
                            <span key={i}>
                              {part}
                              {i < arr.length - 1 && (
                                <span
                                  className={`bg-${item.color}-100 px-2 py-1 rounded font-semibold text-${item.color}-700`}
                                >
                                  {item.highlight}
                                </span>
                              )}
                            </span>
                          ))}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        {/* What Gets Recycled */}
        <motion.section initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center">
                <RefreshCw className="w-6 h-6 mr-3" />
                What is Actually Recycled?
              </h3>

              <div className="bg-white rounded-lg p-6 border border-indigo-200">
                <p className="text-lg text-gray-700 leading-relaxed">
                  This is a key point of understanding. It's{" "}
                  <span className="font-bold text-red-600">not the data</span> that gets recycled. It is the{" "}
                  <span className="bg-indigo-100 px-2 py-1 rounded font-semibold text-indigo-700">
                    ViewHolder object
                  </span>{" "}
                  and its associated{" "}
                  <span className="bg-purple-100 px-2 py-1 rounded font-semibold text-purple-700">view hierarchy</span>
                  (the layout file you inflated). The{" "}
                  <span className="bg-green-100 px-2 py-1 rounded font-semibold text-green-700">
                    onBindViewHolder()
                  </span>{" "}
                  method is called precisely to strip the old data and apply new data to this recycled view structure.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Memory & CPU Behavior */}
        <motion.section initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}>
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <Cpu className="w-8 h-8 text-green-600 mr-3" />🧠 Optimized Memory & CPU Behavior
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp}>
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <MemoryStick className="w-8 h-8 text-green-600 mr-3" />
                    <h3 className="text-xl font-bold text-green-900">Memory Footprint 📉</h3>
                  </div>

                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      <AnimatedCounter end={15} /> views
                    </div>
                    <p className="text-sm text-green-700">instead of 1,000+ views</p>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-bold text-green-600">Incredibly low.</span> Instead of creating 1,000 view
                    objects for a list of 1,000 items, you might only ever have ~15 in memory. This prevents the dreaded
                    <span className="bg-red-100 px-2 py-1 rounded font-semibold text-red-700 mx-1">
                      OutOfMemoryError
                    </span>
                    .
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Zap className="w-8 h-8 text-blue-600 mr-3" />
                    <h3 className="text-xl font-bold text-blue-900">CPU Usage ⚡️</h3>
                  </div>

                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      <AnimatedCounter end={90} />%
                    </div>
                    <p className="text-sm text-blue-700">CPU savings</p>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-bold text-blue-600">Minimal.</span> The two most expensive operations—
                    <span className="bg-yellow-100 px-2 py-1 rounded font-semibold mx-1">
                      inflating a view from XML
                    </span>{" "}
                    and
                    <span className="bg-orange-100 px-2 py-1 rounded font-semibold mx-1">findViewById()</span>—are done
                    only a handful of times at the beginning.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Code Example */}
        <motion.section initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Code className="w-8 h-8 text-purple-600 mr-3" />💻 Minimal Code Snippet
          </h2>

          <Card className="bg-gray-900 border-0 shadow-2xl overflow-hidden relative">
            <CopyButton
              text={`class MyAdapter(private val items: List<String>) : RecyclerView.Adapter<MyAdapter.MyViewHolder>() {
    
    // 1. Called ONLY when RecyclerView needs a NEW view. (Rarely called)
    // This is where you create the "plate".
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.list_item, parent, false)
        return MyViewHolder(view)
    }
    
    // 2. Called EVERY time a view is recycled to show new data. (Frequently called)
    // This is where you put new "food" on the "plate".
    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        val item = items[position]
        holder.titleTextView.text = item
    }
    
    override fun getItemCount(): Int = items.size
    
    // The ViewHolder holds direct references to the subviews. No more findViewById()!
    class MyViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val titleTextView: TextView = itemView.findViewById(R.id.item_title)
    }
}`}
            />
            <CardContent className="p-0">
              <div className="bg-gray-800 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  MyAdapter.kt
                </Badge>
              </div>

              <ScrollArea className="h-96">
                <pre className="p-6 text-sm text-gray-300 leading-relaxed">
                  <code>{`class MyAdapter(private val items: List<String>) : RecyclerView.Adapter<MyAdapter.MyViewHolder>() {
    
    // 1. Called ONLY when RecyclerView needs a NEW view. (Rarely called)
    // This is where you create the "plate".
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.list_item, parent, false)
        return MyViewHolder(view)
    }
    
    // 2. Called EVERY time a view is recycled to show new data. (Frequently called)
    // This is where you put new "food" on the "plate".
    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        val item = items[position]
        holder.titleTextView.text = item
    }
    
    override fun getItemCount(): Int = items.size
    
    // The ViewHolder holds direct references to the subviews. No more findViewById()!
    class MyViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val titleTextView: TextView = itemView.findViewById(R.id.item_title)
    }
}`}</code>
                </pre>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6">
              <h4 className="font-bold text-purple-900 mb-3 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Key Methods Explained:
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-purple-100">
                  <h5 className="font-semibold text-purple-700 mb-2">onCreateViewHolder()</h5>
                  <p className="text-sm text-gray-600">
                    Called rarely - only when a new view is needed. Creates the "plate".
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-purple-100">
                  <h5 className="font-semibold text-purple-700 mb-2">onBindViewHolder()</h5>
                  <p className="text-sm text-gray-600">
                    Called frequently - updates recycled views with new data. Puts "food on the plate".
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Metaphorical Takeaway */}
        <motion.section initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Metaphorical Takeaway</h3>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                <span className="font-bold text-amber-600">RecyclerView</span> is a thrifty librarian with a small set
                of
                <span className="bg-amber-100 px-2 py-1 rounded font-semibold mx-1">magnifying glasses</span>. Instead
                of giving a new one to every reader, they take used ones, clean them, and hand them to the next person
                in line.
                <span className="font-bold text-green-600"> Efficient and resourceful.</span>
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Why RecyclerView is Efficient */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="pb-16"
        >
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why RecyclerView is So Efficient</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <TrendingDown className="w-8 h-8 text-blue-600" />,
                title: "Minimizes Object Creation",
                description:
                  "Inflating views and creating view objects are expensive. RecyclerView does this only a handful of times instead of for every single item.",
                color: "blue",
              },
              {
                icon: <MemoryStick className="w-8 h-8 text-green-600" />,
                title: "Saves Memory 🧠",
                description:
                  "By reusing views, the memory footprint remains small and constant, preventing OutOfMemoryError crashes.",
                color: "green",
              },
              {
                icon: <Cpu className="w-8 h-8 text-purple-600" />,
                title: "Saves CPU ⚡️",
                description:
                  "The ViewHolder pattern caches view children, eliminating repeated findViewById() calls and preventing stuttering.",
                color: "purple",
              },
              {
                icon: <Layers className="w-8 h-8 text-orange-600" />,
                title: "Flexibility",
                description:
                  "Decoupling layout logic into LayoutManager makes it easy to switch between list, grid, or staggered layouts.",
                color: "orange",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className={`bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 border-${item.color}-200 h-full hover:shadow-lg transition-shadow duration-300`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">{item.icon}</div>
                    <h3 className={`text-lg font-bold text-${item.color}-900 mb-3`}>{item.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-bold mb-4">Ready to implement RecyclerView?</h3>
            <p className="text-gray-300 mb-6">Now you understand the magic behind smooth scrolling in Android apps!</p>
            <div className="flex justify-center space-x-4">
              <Badge className="bg-blue-600 hover:bg-blue-700">
                <Code className="w-4 h-4 mr-2" />
                Start Coding
              </Badge>
              <Badge variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
                <Recycle className="w-4 h-4 mr-2" />
                Optimize Performance
              </Badge>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
