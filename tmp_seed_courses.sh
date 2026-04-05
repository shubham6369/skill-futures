#!/bin/bash
# Seed courses via firebase-tools CLI

courses=(
  '{"title":"Forex Trading Masterclass","description":"Master the art of currency trading from basics to advanced strategies.","instructor":"Sarah Johnson","duration":"12 Hours","price":49.99,"enrolled":1250,"rating":4.8,"image":"https://images.unsplash.com/photo-1611974714024-4696f8c7e034?w=800&auto=format&fit=crop","lessons":[{"title":"Introduction to Forex","duration":"45 min","videoUrl":"#"},{"title":"Reading Charts & Indicators","duration":"60 min","videoUrl":"#"}]}'
  '{"title":"Digital Marketing Pro","description":"Learn SEO, SMM, and Email Marketing to grow any business online.","instructor":"Michael Chen","duration":"15 Hours","price":39.99,"enrolled":2100,"rating":4.7,"image":"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop","lessons":[{"title":"SEO Fundamentals","duration":"50 min","videoUrl":"#"},{"title":"Social Media Strategy","duration":"65 min","videoUrl":"#"}]}'
  '{"title":"Graphic Design Essentials","description":"Learn Photoshop and Illustrator to create stunning visual content.","instructor":"Elena Rodriguez","duration":"10 Hours","price":29.99,"enrolled":1800,"rating":4.9,"image":"https://images.unsplash.com/photo-1572044162444-ad60f128bde2?w=800&auto=format&fit=crop","lessons":[{"title":"Principles of Design","duration":"40 min","videoUrl":"#"},{"title":"Working with Layers","duration":"55 min","videoUrl":"#"}]}'
)

for course in "${courses[@]}"; do
  echo "Adding course: $course"
  echo $course | npx firebase-tools firestore:add --project skillfutures courses -y
done

echo "Seeding complete!"
