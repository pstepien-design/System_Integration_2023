import redis

redis_client = redis.Redis(host='localhost', port=6379, db=0)

value = redis_client.get('myKey')

print(str(value, 'utf-8'))