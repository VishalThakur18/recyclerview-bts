"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Database,
  Eye,
  Brain,
  Zap,
  Code,
  Lightbulb,
  ArrowDown,
  ArrowRight,
  RefreshCw,
  Layers,
  Copy,
  Check,
  Users,
  ChefHat,
  Server,
  TestTube,
  Shield,
  Cpu,
  Activity,
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

function RestaurantAnalogy() {
  const [activeComponent, setActiveComponent] = useState(0)
  const components = [
    {
      name: "Model (Kitchen)",
      icon: <ChefHat className="w-8 h-8" />,
      color: "bg-green-500",
      description: "Prepares and manages data",
      details: "Fetches ingredients (data) from storage, processes them, but doesn't know who will consume them.",
    },
    {
      name: "View (Customer)",
      icon: <Users className="w-8 h-8" />,
      color: "bg-blue-500",
      description: "Displays UI and receives input",
      details:
        "Places orders (user actions) and receives the final dish (formatted data) without knowing kitchen details.",
    },
    {
      name: "ViewModel (Waiter)",
      icon: <Server className="w-8 h-8" />,
      color: "bg-purple-500",
      description: "Bridges Model and View",
      details: "Takes orders, communicates with kitchen, formats presentation, and serves the customer perfectly.",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveComponent((prev) => (prev + 1) % components.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 text-white overflow-hidden">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-green-400 mb-4">🍽️ The Restaurant Analogy</h3>
        <p className="text-gray-300 text-lg">Understanding MVVM through a familiar scenario</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {components.map((component, index) => (
          <motion.div
            key={index}
            className={`relative p-6 rounded-lg border-2 transition-all duration-500 ${
              activeComponent === index
                ? "border-yellow-400 bg-slate-700/50 scale-105"
                : "border-slate-600 bg-slate-800/30"
            }`}
            animate={{
              scale: activeComponent === index ? 1.05 : 1,
              opacity: activeComponent === index ? 1 : 0.7,
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <div
                className={`w-16 h-16 ${component.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}
              >
                {component.icon}
              </div>
              <h4 className="text-xl font-bold mb-2">{component.name}</h4>
              <p className="text-gray-300 text-sm mb-4">{component.description}</p>
              <div
                className={`text-xs text-gray-400 transition-opacity duration-500 ${
                  activeComponent === index ? "opacity-100" : "opacity-50"
                }`}
              >
                {component.details}
              </div>
            </div>

            {activeComponent === index && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
              >
                <Zap className="w-3 h-3 text-slate-900" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Badge variant="outline" className="border-yellow-400 text-yellow-400 bg-yellow-400/10">
          Active: {components[activeComponent].name}
        </Badge>
      </div>
    </div>
  )
}

function MVVMInteractiveDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [userAction, setUserAction] = useState("")
  const [modelData, setModelData] = useState("Initial Data")
  const [viewDisplay, setViewDisplay] = useState("Welcome!")

  const steps = [
    {
      title: "User Interaction",
      description: "User clicks a button in the View",
      action: () => {
        setUserAction("Button Clicked!")
        setCurrentStep(1)
      },
    },
    {
      title: "ViewModel Processing",
      description: "ViewModel receives the action and processes it",
      action: () => {
        setCurrentStep(2)
      },
    },
    {
      title: "Model Data Fetch",
      description: "ViewModel requests data from Model",
      action: () => {
        setModelData("Fresh Data from API")
        setCurrentStep(3)
      },
    },
    {
      title: "View Update",
      description: "View observes ViewModel and updates automatically",
      action: () => {
        setViewDisplay("Data Updated Successfully!")
        setCurrentStep(0)
        setTimeout(() => {
          setUserAction("")
          setModelData("Initial Data")
          setViewDisplay("Welcome!")
        }, 2000)
      },
    },
  ]

  useEffect(() => {
    if (currentStep > 0) {
      const timer = setTimeout(() => {
        steps[currentStep].action()
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [currentStep])

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl p-8 text-white">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-indigo-400 mb-4">MVVM Data Flow Simulation</h3>
        <p className="text-gray-300">Watch how data flows through the MVVM architecture</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* View */}
        <div className="bg-blue-800/30 rounded-lg p-6 border border-blue-500/30">
          <div className="flex items-center mb-4">
            <Eye className="w-6 h-6 text-blue-400 mr-2" />
            <h4 className="text-xl font-bold text-blue-400">View</h4>
          </div>
          <div className="bg-blue-900/50 rounded p-4 mb-4 min-h-[100px] flex items-center justify-center">
            <motion.div
              key={viewDisplay}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <p className="text-white font-medium">{viewDisplay}</p>
            </motion.div>
          </div>
          <button
            onClick={steps[0].action}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
            disabled={currentStep > 0}
          >
            {currentStep > 0 ? "Processing..." : "Click Me!"}
          </button>
          {userAction && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-xs text-blue-300"
            >
              Action: {userAction}
            </motion.div>
          )}
        </div>

        {/* ViewModel */}
        <div className="bg-purple-800/30 rounded-lg p-6 border border-purple-500/30">
          <div className="flex items-center mb-4">
            <Brain className="w-6 h-6 text-purple-400 mr-2" />
            <h4 className="text-xl font-bold text-purple-400">ViewModel</h4>
          </div>
          <div className="bg-purple-900/50 rounded p-4 mb-4 min-h-[100px] flex items-center justify-center">
            {currentStep === 1 || currentStep === 2 ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <RefreshCw className="w-8 h-8 text-purple-400" />
              </motion.div>
            ) : (
              <div className="text-center">
                <Activity className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-xs text-purple-300">Ready to process</p>
              </div>
            )}
          </div>
          <div className="text-xs text-purple-300">
            Status: {currentStep === 0 ? "Idle" : steps[currentStep]?.title || "Processing"}
          </div>
        </div>

        {/* Model */}
        <div className="bg-green-800/30 rounded-lg p-6 border border-green-500/30">
          <div className="flex items-center mb-4">
            <Database className="w-6 h-6 text-green-400 mr-2" />
            <h4 className="text-xl font-bold text-green-400">Model</h4>
          </div>
          <div className="bg-green-900/50 rounded p-4 mb-4 min-h-[100px] flex items-center justify-center">
            <motion.div
              key={modelData}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center"
            >
              <p className="text-white text-sm">{modelData}</p>
            </motion.div>
          </div>
          <div className="text-xs text-green-300">{currentStep === 2 ? "Fetching data..." : "Data ready"}</div>
        </div>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center space-x-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentStep === index ? "bg-yellow-400" : "bg-gray-600"
                }`}
              />
              {index < steps.length - 1 && <ArrowRight className="w-4 h-4 text-gray-400 mx-2" />}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-300 mt-4">
          {currentStep === 0 ? "Click the button to start the flow" : steps[currentStep]?.description}
        </p>
      </div>
    </div>
  )
}

function ArchitectureComparison() {
  const [selectedPattern, setSelectedPattern] = useState("MVVM")

  const patterns = {
    MVC: {
      name: "MVC (Model-View-Controller)",
      color: "bg-red-500",
      pros: ["Simple to understand", "Clear separation of concerns", "Widely adopted"],
      cons: ["View and Model can be tightly coupled", "Controller can become bloated", "Testing can be complex"],
      description: "Controller handles user input and updates both Model and View",
    },
    MVP: {
      name: "MVP (Model-View-Presenter)",
      color: "bg-orange-500",
      pros: ["Good testability", "Clear separation", "Presenter handles all logic"],
      cons: ["Tight coupling between View and Presenter", "Not lifecycle-aware", "Manual state management"],
      description: "Presenter acts as intermediary, directly manipulating the View",
    },
    MVVM: {
      name: "MVVM (Model-View-ViewModel)",
      color: "bg-green-500",
      pros: ["Lifecycle-aware", "Loose coupling", "Excellent testability", "Reactive updates"],
      cons: ["Learning curve", "Can be overkill for simple apps", "Requires understanding of observables"],
      description: "ViewModel exposes observable data that View can subscribe to",
    },
  }

  return (
    <div className="bg-slate-900 rounded-xl p-8 text-white">
      <h3 className="text-3xl font-bold text-center mb-8 text-slate-100">Architecture Pattern Comparison</h3>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {Object.entries(patterns).map(([key, pattern]) => (
          <button
            key={key}
            onClick={() => setSelectedPattern(key)}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              selectedPattern === key
                ? `${pattern.color} text-white shadow-lg scale-105`
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            {pattern.name}
          </button>
        ))}
      </div>

      <motion.div
        key={selectedPattern}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid md:grid-cols-2 gap-8"
      >
        <div>
          <h4 className="text-xl font-bold mb-4 text-green-400">✅ Advantages</h4>
          <ul className="space-y-2">
            {patterns[selectedPattern as keyof typeof patterns].pros.map((pro, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center text-slate-300"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                {pro}
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-bold mb-4 text-red-400">❌ Disadvantages</h4>
          <ul className="space-y-2">
            {patterns[selectedPattern as keyof typeof patterns].cons.map((con, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center text-slate-300"
              >
                <div className="w-2 h-2 bg-red-400 rounded-full mr-3" />
                {con}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      <div className="mt-8 p-6 bg-slate-800 rounded-lg">
        <p className="text-slate-300 text-center">
          <span className="font-semibold text-white">Key Concept:</span>{" "}
          {patterns[selectedPattern as keyof typeof patterns].description}
        </p>
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

export default function MVVMBlog() {
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
              Android Architecture
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
              Mastering{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">MVVM</span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>{" "}
              Architecture 🏗️
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover the power of <span className="font-semibold text-blue-600">Model-View-ViewModel</span> pattern.
              Learn how to build <span className="font-semibold text-purple-600">scalable</span>,{" "}
              <span className="font-semibold text-green-600">testable</span>, and{" "}
              <span className="font-semibold text-orange-600">maintainable</span> Android applications with proper
              separation of concerns.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <Layers className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium">Separation of Concerns</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <TestTube className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm font-medium">Highly Testable</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <Shield className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-sm font-medium">Lifecycle Aware</span>
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
              What is MVVM and Why Use It?
            </h2>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  <span className="font-bold text-blue-600">MVVM</span> stands for{" "}
                  <span className="bg-blue-100 px-2 py-1 rounded font-semibold mx-1">Model-View-ViewModel</span>. It's
                  an architectural pattern, which is just a fancy way of saying it's a template for organizing code in a
                  project.
                </p>

                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 border-l-4 border-purple-500 mb-6">
                  <h4 className="font-bold text-purple-900 mb-3">🎯 The Single Most Important Goal</h4>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-bold text-green-600">Separation of Concerns</span>. Instead of mixing
                    everything together (data, UI, logic), it divides the work into three distinct parts.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Easier to Manage",
                      icon: <Cpu className="w-6 h-6 text-blue-500" />,
                      description:
                        "When code is separated, it's simpler to find things, fix bugs, and add new features.",
                    },
                    {
                      title: "Easier to Test",
                      icon: <TestTube className="w-6 h-6 text-green-500" />,
                      description:
                        "You can test your app's logic (the ViewModel) without needing to run the UI, which makes testing faster and more reliable.",
                    },
                    {
                      title: "Fewer Crashes",
                      icon: <Shield className="w-6 h-6 text-purple-500" />,
                      description:
                        "MVVM is designed to work well with the Android lifecycle. It helps prevent data loss and crashes when the user does things like rotating the screen.",
                    },
                  ].map((benefit, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                      <div className="flex items-center mb-3">
                        {benefit.icon}
                        <h5 className="font-semibold ml-2">{benefit.title}</h5>
                      </div>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        {/* Restaurant Analogy */}
        <motion.section initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Understanding Through Analogy</h2>
          <RestaurantAnalogy />
        </motion.section>

        {/* The Three Components */}
        <motion.section initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}>
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <Layers className="w-8 h-8 text-indigo-600 mr-3" />
              The Three Musketeers: Model, View, and ViewModel
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "1. The Model",
                icon: <Database className="w-8 h-8 text-green-600" />,
                color: "from-green-50 to-emerald-50 border-green-200",
                description:
                  "The Model is all about the data. It is not 'the data' itself, but the part of your app responsible for getting and managing it.",
                details: [
                  "Fetches data from the internet (using libraries like Retrofit)",
                  "Manages local database (using Room)",
                  "Provides data from any other source",
                ],
                keyTrait:
                  "The Model is 'dumb' when it comes to the UI. It has no idea that a View or ViewModel exists. It just provides data when asked.",
              },
              {
                title: "2. The View",
                icon: <Eye className="w-8 h-8 text-blue-600" />,
                color: "from-blue-50 to-cyan-50 border-blue-200",
                description: "The View is all about the screen. It's what the user sees and touches.",
                details: [
                  "Displays data given by the ViewModel",
                  "Reports user actions (button clicks, text input)",
                  "Updates automatically when data changes",
                ],
                keyTrait:
                  "The View should also be 'dumb.' It should not contain any business logic. If a user clicks a 'Login' button, the View's only job is to tell the ViewModel, 'Hey, the login button was clicked!'",
              },
              {
                title: "3. The ViewModel",
                icon: <Brain className="w-8 h-8 text-purple-600" />,
                color: "from-purple-50 to-violet-50 border-purple-200",
                description: "The ViewModel is the brain for the UI. It connects the View and the Model.",
                details: [
                  "Gets data from the Model",
                  "Performs necessary logic (formatting, calculations)",
                  "Exposes data for the View to display",
                ],
                keyTrait:
                  "Its Superpower! The ViewModel is lifecycle-aware. This means it survives configuration changes. When you rotate your phone, the Activity (View) is destroyed and recreated, but the ViewModel survives, holding onto its data.",
              },
            ].map((component, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className={`bg-gradient-to-br ${component.color} h-full`}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {component.icon}
                      <h3 className="text-xl font-bold ml-3">{component.title}</h3>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">{component.description}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">What it does:</h4>
                      <ul className="space-y-1">
                        {component.details.map((detail, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white/60 rounded-lg p-3 border-l-4 border-yellow-400">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold text-yellow-700">Key Trait:</span> {component.keyTrait}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Interactive Demo */}
        <motion.section initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Behind the Scenes: How Components Communicate
          </h2>
          <MVVMInteractiveDemo />

          <Card className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center">
                <Zap className="w-6 h-6 mr-2" />
                The Magic of Observability
              </h3>
              <p className="text-gray-700 leading-relaxed">
                The "magic" that connects the View and ViewModel is a concept called{" "}
                <span className="bg-indigo-100 px-2 py-1 rounded font-semibold">observability</span>. The View observes
                (watches) data in the ViewModel. When the data changes, the ViewModel notifies the View automatically so
                it can update itself. In Android, this is done using{" "}
                <span className="bg-purple-100 px-2 py-1 rounded font-semibold">LiveData</span> or{" "}
                <span className="bg-blue-100 px-2 py-1 rounded font-semibold">StateFlow</span>.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Code Examples */}
        <motion.section initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Code className="w-8 h-8 text-green-600 mr-3" />
            Code Examples: Bringing It All Together
          </h2>

          <div className="space-y-8">
            {/* ViewModel Code */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">1. The ViewModel with LiveData</h3>
              <Card className="bg-gray-900 border-0 shadow-2xl overflow-hidden relative">
                <CopyButton
                  text={`// Import necessary libraries
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

// This is our ViewModel
class MyViewModel : ViewModel() {
    // This is the private, changeable data. Only the ViewModel can change it.
    // We start it with a default message.
    private val _messageForUI = MutableLiveData<String>("Hello, World!")
    
    // This is the public, non-changeable data that the View will watch.
    // The View can read it, but can't change it.
    val messageForUI: LiveData<String> = _messageForUI
    
    // A function the View can call, for example, when a button is clicked.
    fun onButtonClicked() {
        // We change the data here
        _messageForUI.value = "You clicked the button!"
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
                      MyViewModel.kt
                    </Badge>
                  </div>

                  <ScrollArea className="h-96">
                    <pre className="p-6 text-sm text-gray-300 leading-relaxed">
                      <code>{`// Import necessary libraries
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

// This is our ViewModel
class MyViewModel : ViewModel() {
    // This is the private, changeable data. Only the ViewModel can change it.
    // We start it with a default message.
    private val _messageForUI = MutableLiveData<String>("Hello, World!")
    
    // This is the public, non-changeable data that the View will watch.
    // The View can read it, but can't change it.
    val messageForUI: LiveData<String> = _messageForUI
    
    // A function the View can call, for example, when a button is clicked.
    fun onButtonClicked() {
        // We change the data here
        _messageForUI.value = "You clicked the button!"
    }
}`}</code>
                    </pre>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* View Code */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                2. The View (Activity) that observes the ViewModel
              </h3>
              <Card className="bg-gray-900 border-0 shadow-2xl overflow-hidden relative">
                <CopyButton
                  text={`// Import necessary libraries
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.lifecycle.ViewModelProvider
import android.widget.TextView
import android.widget.Button

// This is our View
class MainActivity : AppCompatActivity() {
    private lateinit var myViewModel: MyViewModel
    private lateinit var myTextView: TextView
    private lateinit var myButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Find our UI elements
        myTextView = findViewById(R.id.my_text_view)
        myButton = findViewById(R.id.my_button)

        // Get an instance of our ViewModel
        myViewModel = ViewModelProvider(this).get(MyViewModel::class.java)

        // *** THIS IS THE MAGIC! ***
        // We start observing the data. The code inside the brackets
        // will run automatically whenever the data changes.
        myViewModel.messageForUI.observe(this) { newMessage ->
            // Update the text view with the new message
            myTextView.text = newMessage
        }

        // Tell the ViewModel when the user clicks the button
        myButton.setOnClickListener {
            myViewModel.onButtonClicked()
        }
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
                      MainActivity.kt
                    </Badge>
                  </div>

                  <ScrollArea className="h-96">
                    <pre className="p-6 text-sm text-gray-300 leading-relaxed">
                      <code>{`// Import necessary libraries
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.lifecycle.ViewModelProvider
import android.widget.TextView
import android.widget.Button

// This is our View
class MainActivity : AppCompatActivity() {
    private lateinit var myViewModel: MyViewModel
    private lateinit var myTextView: TextView
    private lateinit var myButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Find our UI elements
        myTextView = findViewById(R.id.my_text_view)
        myButton = findViewById(R.id.my_button)

        // Get an instance of our ViewModel
        myViewModel = ViewModelProvider(this).get(MyViewModel::class.java)

        // *** THIS IS THE MAGIC! ***
        // We start observing the data. The code inside the brackets
        // will run automatically whenever the data changes.
        myViewModel.messageForUI.observe(this) { newMessage ->
            // Update the text view with the new message
            myTextView.text = newMessage
        }

        // Tell the ViewModel when the user clicks the button
        myButton.setOnClickListener {
            myViewModel.onButtonClicked()
        }
    }
}`}</code>
                    </pre>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>

        {/* Architecture Comparison */}
        <motion.section initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            MVVM vs. Others: Evolution of Architecture Patterns
          </h2>
          <ArchitectureComparison />

          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">📊 Detailed Comparison Table</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-blue-200">
                      <th className="text-left p-3 font-semibold">Feature</th>
                      <th className="text-left p-3 font-semibold text-orange-700">MVP</th>
                      <th className="text-left p-3 font-semibold text-green-700">MVVM</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-blue-100">
                      <td className="p-3 font-medium">View-Logic Link</td>
                      <td className="p-3">Presenter holds direct reference to View. Tightly coupled.</td>
                      <td className="p-3">ViewModel exposes data streams. View subscribes. Loosely coupled.</td>
                    </tr>
                    <tr className="border-b border-blue-100">
                      <td className="p-3 font-medium">Lifecycle Awareness</td>
                      <td className="p-3">Not naturally lifecycle-aware. Manual state management required.</td>
                      <td className="p-3">Lifecycle-aware by design. Survives configuration changes automatically.</td>
                    </tr>
                    <tr className="border-b border-blue-100">
                      <td className="p-3 font-medium">Testability</td>
                      <td className="p-3">Good. Test Presenter by mocking the View.</td>
                      <td className="p-3">Excellent. Test ViewModel without any View reference.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Optimization</td>
                      <td className="p-3">Requires more boilerplate for Android-specific problems.</td>
                      <td className="p-3">More optimized for modern Android with built-in lifecycle support.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="pb-16"
        >
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why MVVM is Powerful</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Layers className="w-8 h-8 text-blue-600" />,
                title: "Separation of Concerns",
                description: "Keep UI, logic, and data code in separate, manageable parts.",
                color: "blue",
                stat: "3x",
                statLabel: "Easier Maintenance",
              },
              {
                icon: <TestTube className="w-8 h-8 text-green-600" />,
                title: "Highly Testable",
                description: "Test ViewModel logic independently without UI dependencies.",
                color: "green",
                stat: "90%",
                statLabel: "Test Coverage",
              },
              {
                icon: <Shield className="w-8 h-8 text-purple-600" />,
                title: "Lifecycle Aware",
                description: "Survives configuration changes and prevents memory leaks.",
                color: "purple",
                stat: "0",
                statLabel: "Data Loss Issues",
              },
              {
                icon: <Zap className="w-8 h-8 text-orange-600" />,
                title: "Reactive Updates",
                description: "UI updates automatically when data changes through observables.",
                color: "orange",
                stat: "100%",
                statLabel: "Automatic Updates",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className={`bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 border-${item.color}-200 h-full hover:shadow-lg transition-shadow duration-300`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">{item.icon}</div>
                    <h3 className={`text-lg font-bold text-${item.color}-900 mb-3`}>{item.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">{item.description}</p>
                    <div className="text-center">
                      <div className={`text-2xl font-bold text-${item.color}-600`}>
                        <AnimatedCounter end={Number.parseInt(item.stat.replace(/\D/g, "") || "0")} />
                        {item.stat.replace(/\d/g, "")}
                      </div>
                      <div className="text-xs text-gray-600">{item.statLabel}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Summary Section */}
        <motion.section initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-indigo-900 mb-4">Summary & Core Ideas</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-indigo-800 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mr-2" />
                    Summary
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    MVVM is a powerful architectural pattern that separates your app into three parts: the{" "}
                    <span className="font-semibold text-green-600">Model</span> (data), the{" "}
                    <span className="font-semibold text-blue-600">View</span> (UI), and the{" "}
                    <span className="font-semibold text-purple-600">ViewModel</span> (UI logic). The ViewModel acts as a
                    bridge, preparing data for the View and handling user input. It uses observable data holders like
                    LiveData or StateFlow so that the View can reactively update itself when data changes. This pattern
                    is highly recommended by Google for modern Android development because it creates clean, highly
                    testable, and robust apps that gracefully handle lifecycle events like screen rotation.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-indigo-800 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mr-2" />
                    Core Concepts
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Separation of Concerns: Keep UI, logic, and data code in separate places",
                      "ViewModel: A lifecycle-aware component for holding and processing UI-related data",
                      "LiveData/StateFlow: Observable data holders that the View can watch for changes",
                      "Data Binding (Optional but powerful): Link UI components directly to data sources",
                      "Reactivity: The View reacts to data changes automatically",
                      "Testability: Logic in the ViewModel can be tested easily, independent of the Android framework",
                    ].map((concept, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                        {concept}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-bold mb-4">Ready to implement MVVM in your Android app?</h3>
            <p className="text-gray-300 mb-6">
              Start building more maintainable, testable, and robust Android applications today!
            </p>
            <div className="flex justify-center space-x-4">
              <Badge className="bg-blue-600 hover:bg-blue-700">
                <Code className="w-4 h-4 mr-2" />
                Start Coding
              </Badge>
              <Badge variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
                <Brain className="w-4 h-4 mr-2" />
                Learn More
              </Badge>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
